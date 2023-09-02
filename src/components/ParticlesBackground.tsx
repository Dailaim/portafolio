import Particles from "@/lib/tsParticle";
import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const particlesInit = $(async (engine: Engine): Promise<void> => {
  await loadFull(engine);
});

export const ParticlesBackground = component$(() => {
  const visibleSig = useSignal(false);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => visibleSig.value);
    const initParticles = async () => {
      setTimeout(() => {
        visibleSig.value = true;
      }, 2300);
    };

    initParticles();
  });

  return (
    <>
      <Particles
        id="tsparticles"
        class={{
          hidden: !visibleSig.value,
        }}
        options={{
          background: {
            opacity: 0,
            color: {
              value: "#111111",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#000000",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: false,
        }}
        init={particlesInit}
        style={{
          zIndex: -999,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
        }}
      />
    </>
  );
});
