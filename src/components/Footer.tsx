import { InnerContainer, OuterContainer } from "@/components/Container";
import { myName } from "@/lib/const";
import { routes } from "@/lib/routes";
import type { HTMLAttributes } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

const NavLink = component$<
  { href: string } & HTMLAttributes<HTMLAnchorElement>
>(({ href }) => {
  return (
    <Link
      href={href}
      class="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      <Slot />
    </Link>
  );
});

export const Footer = component$(() => {
  return (
    <footer class="mt-32 flex-none">
      <OuterContainer>
        <div class="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <InnerContainer>
            <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {routes.map((item) => (
                  <>
                    <NavLink href={item.path}>{item.name}</NavLink>
                  </>
                ))}
              </div>
              <p class="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} {myName}. All rights reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  );
});
