import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

const ParticlesComponent = (props) => {
    const options = useMemo(() => ({
        background: {
            color: {
                value: "#00000",
            },
        },
        fpsLimit: 120,
        interactivity: {
            modes: {
                push: {
                    distance: 200,
                    duration: 15,
                },
                grab: {
                    distance: 150,
                },
            },
        },
        particles: {
            color: {
                value: "#b87230",
            },
            links: {
                color: "#b87230",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 150,
            },
            opacity: {
                value: 1.0,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    }), []);

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine); 
    }, []);

    const particlesLoaded = useCallback((container) => {
        console.log(container);
    }, []);

    return <Particles id={props.id} init={particlesInit} loaded={particlesLoaded} options={options} />;
};

export default ParticlesComponent;