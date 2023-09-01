import { ThemeProvider } from "@/context/useTheme";
import { Slot, component$ } from "@builder.io/qwik";

export const Providers = component$(() => {
  return (
    <>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Slot />
      </ThemeProvider>
    </>
  );
});
