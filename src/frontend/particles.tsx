import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import type { Engine, Container } from "tsparticles-engine"; // Import types
import { loadSlim } from "tsparticles-slim"; 

// ✅ Define Props Type
interface ParticlesComponentProps {
    id?: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ id }) => {
    const options = useMemo(() => ({
        background: {
            color: {
                value: "#000000",
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

    // ✅ Define engine initialization function with proper typing
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine); 
    }, []);

    // ✅ Define particles loaded function with correct type
    const particlesLoaded = useCallback((container?: Container) => {
        console.log(container);
    }, []);

    return <Particles id={id} init={particlesInit} loaded={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
