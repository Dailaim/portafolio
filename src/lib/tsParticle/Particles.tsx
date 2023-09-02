import {
  $,
  NoSerialize,
  component$, noSerialize, useSignal, useVisibleTask$
} from "@builder.io/qwik";
import { Container, tsParticles } from "tsparticles-engine";
import type { IParticlesProps } from "./IParticlesProps";
import { deepCompare } from "./Utils";

/**
 * @param (props:IParticlesProps) Particles component properties
 */
const Particles = component$<IParticlesProps>((props) => {
  const init= useSignal(false);
  const library = useSignal<NoSerialize<Container | undefined>>(undefined);

  const id = props.id ?? "tsparticles";

  const {
    init: InitFC,
    class:className,
    canvasClassName,
    height,
    width,
    loaded
    
  } = props;

  useVisibleTask$(({track, cleanup}) => {
    track(()=> init.value);
      const loadParticles = $(async () => {
          if (!init) return;

          const container = await tsParticles.load({
              url: props.url,
              id,
              options: props.options ?? props.params,
              fpsLimit: 60
          });

          if (props.container) {
              props.container.value  = noSerialize(container);
          }
          console.log("container", container?.fpsLimit);

          library.value = noSerialize(container);

          if (loaded) {
              await loaded(container!);
          }
      });

      const initParticles = async () => {
          if (InitFC) {
              await InitFC!(tsParticles);
          }

          init.value = true;
          await loadParticles();
      };

      initParticles();

      cleanup(() => {
          if (library.value) {
              library.value.destroy();
              library.value = undefined;
          }
      });
  });

  useVisibleTask$(() => {
      if (!deepCompare(props, library, key => key.startsWith("_"))) {
          if (library.value) {
            library.value.destroy();
              library.value = (undefined);
          }
      }
  });

  return (
    <div class={className} id={id}>
      <canvas
        class={canvasClassName}
        height={height}
        width={width}
        style={{
          ...props.style,
        }}
      />
    </div>
  );
});

export default Particles;
