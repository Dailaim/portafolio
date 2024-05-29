import { Qclsx } from "@/lib/Qclsx";
import { Slot, component$, type QwikAttributes } from "@builder.io/qwik";

export const Prose = component$<QwikAttributes<HTMLElement>>(
  ({ class: className, ...props }) => {
    return (
      <div class={Qclsx("prose dark:prose-invert", className)} {...props}>
        <Slot />
      </div>
    );
  }
);
