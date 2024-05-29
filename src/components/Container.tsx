import { Qclsx } from "@/lib/Qclsx";
import type { HtmlHTMLAttributes, QwikAttributes } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

export const OuterContainer = component$<HtmlHTMLAttributes<HTMLDivElement>>(
  ({ ref, class: className, ...props }) => {
    return (
      <div ref={ref} class={Qclsx("sm:px-8", className)} {...props}>
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <Slot />
        </div>
      </div>
    );
  }
);

export const InnerContainer = component$<QwikAttributes<HTMLDivElement>>(
  ({ class: className, ref, ...props }) => {
    return (
      <div
        ref={ref}
        class={Qclsx("relative px-4 sm:px-8 lg:px-12", className)}
        {...props}
      >
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <Slot />
        </div>
      </div>
    );
  }
);

export const Container = component$<HtmlHTMLAttributes<HTMLDivElement>>(
  ({ ref, ...props }) => {
    return (
      <OuterContainer ref={ref} {...props}>
        <InnerContainer>
          <Slot />
        </InnerContainer>
      </OuterContainer>
    );
  }
);
