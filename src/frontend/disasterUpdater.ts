import fs from 'fs';
import axios from 'axios';
import { Parser } from 'xml2js';

interface Earthquake {
    properties: {
        mag: number;
        place: string;
        time: number;
        url: string;
    };
}

interface EarthquakeResponse {
    features: Earthquake[];
}

interface Hurricane {
    stormName: string;
    basin: string;
}

interface FloodItem {
    title: string[];
    description: string[];
    link: string[];
}

interface FloodResponse {
    rss: {
        channel: [{
            item: FloodItem[];
        }];
    };
}

interface EventData {
    id: number;
    month: string;
    year: string;
    title: string;
    description: string;
    link?: string;
}

async function fetchEarthquakes(): Promise<EventData[] | null> {
    try {
        const earthquakeResponse = await axios.get<EarthquakeResponse>('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson');
        const earthquakes = earthquakeResponse.data.features;

        if (earthquakes.length > 0) {
            return earthquakes.map(earthquake => ({
                id: Date.now(),
                month: new Date(earthquake.properties.time).toLocaleString('default', { month: 'short' }),
                year: new Date(earthquake.properties.time).getFullYear().toString(),
                title: `Magnitude ${earthquake.properties.mag} Earthquake in ${earthquake.properties.place}`,
                description: `A magnitude ${earthquake.properties.mag} earthquake occurred in ${earthquake.properties.place} on ${new Date(earthquake.properties.time).toLocaleString()}.`,
                link: earthquake.properties.url,
            }));
        }
        return null;
    } catch (error) {
        console.error('Error fetching earthquakes:', error);
        return null;
    }
}

async function fetchHurricanes(): Promise<EventData[] | null> {
    try {
        const hurricaneResponse = await axios.get<{ activeStorms: Hurricane[] }>('https://www.nhc.noaa.gov/data/Active_Storms.json');
        const hurricanes = hurricaneResponse.data.activeStorms;

        if (hurricanes && hurricanes.length > 0) {
            return hurricanes.map(hurricane => ({
                id: Date.now(),
                month: new Date().toLocaleString('default', { month: 'short' }),
                year: new Date().getFullYear().toString(),
                title: `Hurricane ${hurricane.stormName} in ${hurricane.basin}`,
                description: `Hurricane ${hurricane.stormName} is currently active in the ${hurricane.basin} basin.`,
                link: 'https://www.nhc.noaa.gov/',
            }));
        }
        return null;
    } catch (error) {
        console.error('Error fetching hurricanes:', error);
        return null;
    }
}

async function fetchFloods(): Promise<EventData[] | null> {
    try {
        const floodResponse = await axios.get<string>('https://water.weather.gov/ahps2/rss/national.rss');
        const parser = new Parser();
        const floodData: FloodResponse = await parser.parseStringPromise(floodResponse.data);

        if (floodData.rss.channel[0].item && floodData.rss.channel[0].item.length > 0) {
            return floodData.rss.channel[0].item.map(flood => ({
                id: Date.now(),
                month: new Date().toLocaleString('default', { month: 'short' }),
                year: new Date().getFullYear().toString(),
                title: `Flood Warning: ${flood.title[0]}`,
                description: flood.description[0],
                link: flood.link[0],
            }));
        }
        return null;
    } catch (error) {
        console.error('Error fetching floods:', error);
        return null;
    }
}

async function checkForDisastersAndUpdateEvents(): Promise<void> {
    try {
        const allEvents: EventData[] = [];

        const earthquakes = await fetchEarthquakes();
        if (earthquakes) {
            allEvents.push(...earthquakes);
        }

        const hurricanes = await fetchHurricanes();
        if (hurricanes) {
            allEvents.push(...hurricanes);
        }

        const floods = await fetchFloods();
        if (floods) {
            allEvents.push(...floods);
        }

        if (allEvents.length > 0) {
            fs.readFile('./events.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading events.json:', err);
                    return;
                }

                const events: EventData[] = JSON.parse(data);
                events.push(...allEvents);

                fs.writeFile('./events.json', JSON.stringify(events, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing to events.json:', err);
                    } else {
                        console.log('events.json updated!');
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error checking for disasters:', error);
    }
}

setInterval(checkForDisastersAndUpdateEvents, 60000);