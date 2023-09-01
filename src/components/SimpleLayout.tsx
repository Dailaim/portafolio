import { Container } from "@/components/Container";
import { Slot, component$ } from "@builder.io/qwik";

export const SimpleLayout = component$<{
  title: string;
  intro: string;
}>(({ title, intro }) => {
  return (
    <Container class="mt-16 sm:mt-32">
      <header class="max-w-2xl">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">{intro}</p>
      </header>
      <div class="mt-16 sm:mt-20">
        <Slot />
      </div>
    </Container>
  );
});
