import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import type { Engine, Container, IOptions, RecursivePartial } from "tsparticles-engine"; // ✅ Ensure correct typings
import { loadSlim } from "tsparticles-slim"; 

interface ParticlesComponentProps {
    id?: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ id }) => {
    const options: RecursivePartial<IOptions> = useMemo(() => ({
        background: {
            color: {
                value: "#1a1a2e", // Dark blue for better contrast
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                onClick: {
                    enable: true,
                    mode: "push",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
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
    const particlesLoaded = useCallback(async (container?: Container) => {
        console.log(container);
        return Promise.resolve();
    }, []);

    return <Particles id={id} init={particlesInit} loaded={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
