import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import type { Engine, Container, IOptions, RecursivePartial } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; 

interface ParticlesComponentProps {
    id?: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ id }) => {
    const options: RecursivePartial<IOptions> = useMemo(() => ({
        background: {
            color: {
                value: "#101010",  // ✅ Updated background color to match the app
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
                value: "#ff0000",  // ✅ Updated particle color for better visibility
            },
            links: {
                color: "#ff0000",
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
                value: 120,
            },
            opacity: {
                value: 0.7,  // ✅ Reduced opacity for a softer effect
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

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine); 
    }, []);

    const particlesLoaded = useCallback(async (container?: Container) => {
        console.log(container);
        return Promise.resolve();
    }, []);

    return <Particles id={id} init={particlesInit} loaded={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
