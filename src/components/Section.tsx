import type { HTMLAttributes } from "@builder.io/qwik";
import { Slot, component$, useId } from "@builder.io/qwik";

export const Section = component$<
  HTMLAttributes<HTMLElement> | HTMLAttributes<HTMLElement> & {
    title: string;
  }
>(({ title, ...props }) => {
  const id = useId();

  return (
    <section
      {...props}
      aria-labelledby={id}
      class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      <div class="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2
          id={id}
          class="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
        >
          {title}
        </h2>
        <div class="md:col-span-3">
          <Slot />
        </div>
      </div>
    </section>
  );
});
