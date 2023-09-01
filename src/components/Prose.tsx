import { Qclsx } from "@/lib/Qclsx";
import { Slot, component$, type HTMLAttributes } from "@builder.io/qwik";

export const Prose = component$<HTMLAttributes<HTMLElement>>(
  ({ class: className, ...props }) => {
    return (
      <div class={Qclsx("prose dark:prose-invert", className)} {...props}>
        <Slot />
      </div>
    );
  }
);
