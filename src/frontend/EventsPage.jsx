import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './events.css';
import eventsData from './events.json';
import ParticlesComponent from './particles';

const EventsPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const timelineRef = useRef(null);

    useEffect(() => {
        const adjustTimelineContent = () => {
            if (timelineRef.current) {
                const timelineItems = timelineRef.current.querySelectorAll('.timeline');
                const isMobile = window.innerWidth <= 400;

                timelineItems.forEach((item, index) => {
                    const content = item.querySelector('.timeline-content');
                    const date = item.querySelector('.date');
                    const month = item.querySelector('.month');
                    const year = item.querySelector('.year');

                    if (isMobile) {
                        content.style.width = '90%';
                        content.style.fontSize = '12px';
                        content.style.position = 'relative';
                        content.style.margin = '10px auto';
                        content.style.textAlign = 'center';
                        content.style.left = '0';
                        content.style.display = 'block';
                        date.style.fontSize = '14px';
                        month.style.fontSize = '12px';
                        year.style.fontSize = '16px';
                    } else {
                        content.style.width = '';
                        content.style.fontSize = '';
                        content.style.position = '';
                        content.style.margin = '';
                        content.style.textAlign = '';
                        content.style.left = '';
                        content.style.display = '';
                        date.style.fontSize = '';
                        month.style.fontSize = '';
                        year.style.fontSize = '';
                    }
                });
            }
        };

        adjustTimelineContent();
        window.addEventListener('resize', adjustTimelineContent);

        return () => {
            window.removeEventListener('resize', adjustTimelineContent);
        };
    }, []);

    const handleDateClick = (event) => {
        setScrollPosition(window.scrollY);
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
        window.scrollTo(0, scrollPosition);
    };

    // Sort data in descending order based on id
    const sortedData = [...eventsData].sort((a, b) => b.id - a.id);

    return (
        <div className="events-page-container">
            <div className="header-section">
                <div className="header-content">
                    <h1>Welcome to Events</h1>
                    <p>Discover the latest events happening at ACM.</p>
                </div>
            </div>
            <div className="main-timeline" ref={timelineRef}>
                <ParticlesComponent id="particles" />
                {sortedData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="timeline"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="icon"></div>
                        <div className="date-content" onClick={() => handleDateClick(item)}>
                            <motion.div
                                className="date-outer"
                                style={{ cursor: 'pointer' }}
                                initial={{ scale: 0.8 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <span className="date" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '18px' }}>
                                    <span className="month" style={{ fontSize: window.innerWidth <= 768 ? '12px' : '16px' }}>{item.month}</span>
                                    <span className="year" style={{ fontSize: window.innerWidth <= 768 ? '16px' : '20px' }}>{item.year}</span>
                                </span>
                            </motion.div>
                        </div>
                        <motion.div
                            className="timeline-content" onClick={() => handleDateClick(item)}
                            style={{ fontSize: window.innerWidth <= 768 ? '12px' : '16px' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="title" style={{ fontSize: window.innerWidth <= 768 ? '14px' : '18px' }}>{item.title}</h3>
                        </motion.div>
                    </motion.div>
                ))}

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header>
                        <Modal.Title>{selectedEvent?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Date:</strong> {selectedEvent?.month} {selectedEvent?.year}</p>
                        <p><strong>Description:</strong> {selectedEvent?.description}</p>
                        {selectedEvent?.link && (
                            <p><strong>Link:</strong> <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" className="modal-link">{selectedEvent.link}</a></p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default EventsPage;