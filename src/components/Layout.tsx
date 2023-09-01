import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Slot, component$ } from "@builder.io/qwik";

export const Layout = component$(() => {
  return (
    <>
      <div class="fixed dark:bg-black inset-0 flex justify-center sm:px-8">
        <div class="flex w-full max-w-7xl lg:px-8">
          <div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div class="relative flex w-full flex-col">
        <Header />
        <main class="flex-auto">
          <Slot />
        </main>
        <Footer />
      </div>
    </>
  );
});
