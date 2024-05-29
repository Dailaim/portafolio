import { Qclsx } from "@/lib/Qclsx";
import type { HtmlHTMLAttributes } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import AvataImage from "@/images/avatar.webp?jsx";

export const AvatarContainer = component$<HtmlHTMLAttributes<HTMLDivElement>>(
  ({ class: className, ...props }) => {
    return (
      <div
        class={Qclsx(
          className,
          "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
        )}
        {...props}
      >
        <Slot />
      </div>
    );
  }
);

export const Avatar = component$<
HtmlHTMLAttributes<HTMLElement> & { large?: boolean }
>(({ large = false, class: className, ...props }) => {
  return (
    <Link
      href="/"
      aria-label="Home"
      class={Qclsx(className, "pointer-events-auto") }
      {...props}
    >
      <AvataImage
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        class={Qclsx(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
      />
    </Link>
  );
});
