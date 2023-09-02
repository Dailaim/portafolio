import { component$, Slot } from "@builder.io/qwik";

import { Layout } from "@/components/Layout";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { myName } from "@/lib/const";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Providers } from "./providers";

// export const onGet: RequestHandler = async ({ cacheControl }) => {
//   // Control caching for this request for best performance and to reduce hosting costs:
//   // https://qwik.builder.io/docs/caching/
//   cacheControl({
//     // Always serve a cached response by default, up to a week stale
//     staleWhileRevalidate: 60 * 60 * 24 * 7,
//     // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
//     maxAge: 5,
//   });
// };

export default component$(() => {
  return (
    <span class="h-full antialiased min-h-screen">
      <span class="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <ParticlesBackground />
          <div class="flex w-full">
            <Layout>
              <Slot />
            </Layout>
          </div>
        </Providers>
      </span>
    </span>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - ${myName}`,
  };
};
