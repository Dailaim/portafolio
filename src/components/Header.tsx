import { Container } from "@/components/Container";
import { Qclsx } from "@/lib/Qclsx";
import type { HTMLAttributes, Signal } from "@builder.io/qwik";
import {
  $,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

import { useTheme } from "@/context/useTheme";
import { routes } from "@/lib/routes";
import { Avatar, AvatarContainer } from "./Avatar";
import { MobileNavigation } from "./HeaderMobil";

export const SunIcon = component$<HTMLAttributes<HTMLElement>>((props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12A4 4 0 0 1 12 8v0a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4v0A4 4 0 0 1 8 12v0Z" />
      <path
        d="M12 2v2M22 12h-2M19.293 19.293l-1.414-1.414M19.293 4.707l-1.414 1.414M12 22v2M2 12h2M4.707 4.707L3.293 3.293M4.707 19.293l-1.414 1.414"
        fill="none"
      />
    </svg>
  );
});

export const MoonIcon = component$<HTMLAttributes<HTMLElement>>((props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const NavItem = component$<
  HTMLAttributes<HTMLElement> & { href: string }
>(({ href }) => {
  const isActive = useLocation().url.pathname === `${href}/`;

  return (
    <li>
      <Link
        href={href}
        class={Qclsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-teal-500 dark:text-violet-500"
            : "hover:text-teal-500 dark:hover:text-violet-500"
        )}
      >
        <Slot />
        {isActive && (
          <span class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
});

export const DesktopNavigation = component$<HTMLAttributes<HTMLElement>>(
  (props) => {
    return (
      <nav {...props}>
        <ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          {routes.map((route) => (
            <NavItem key={route.path} href={route.path}>
              {route.name}
            </NavItem>
          ))}
        </ul>
      </nav>
    );
  }
);

export const ThemeToggle = component$(() => {
  const { resolvedTheme, setTheme } = useTheme();

  const SwitchTheme = `Switch to ${
    resolvedTheme.value === "dark" ? "light" : "dark"
  } theme`;

  const toggleTheme = "toggle theme";

  return (
    <>
      <button
        type="button"
        aria-label={
          resolvedTheme.value === "dark" || resolvedTheme.value === "light"
            ? SwitchTheme
            : toggleTheme
        }
        class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        onClick$={() => {
          setTheme(resolvedTheme.value === "dark" ? "light" : "dark");
        }}
      >
        <SunIcon class="animate-spin animate-once animate-ease-out  animate-fill-both h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
        <MoonIcon class="animate-jump animate-once animate-ease-in-out animate-alternate animate-fill-forwards hidden h-6 w-6 fill-zinc-700 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-violet-500 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500 stroke-violet-500 " />
      </button>
    </>
  );
});

export const AvatarComponent = component$<
  HTMLAttributes<HTMLElement> & {
    headerRef: Signal<HTMLElement | undefined>;
  }
>(({ headerRef }) => {
  const avatarRef = useSignal<HTMLElement>();
  const isInitial = useSignal(true);

  const clamp = $((number: number, a: number, b: number) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.min(Math.max(number, min), max);
  });

  useVisibleTask$(async ({ cleanup }) => {
    const downDelay = avatarRef.value?.offsetTop ?? 0;
    const upDelay = 64;

    function setProperty(property: string, value: string | null) {
      document.documentElement.style.setProperty(property, value);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    async function updateHeaderStyles() {
      const { top, height } = headerRef.value!.getBoundingClientRect();
      const scrollY = await clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial.value) {
        setProperty("--header-position", "sticky");
      }

      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial.value || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed");
        removeProperty("--header-top");
        removeProperty("--avatar-top");
      } else {
        removeProperty("--header-inner-position");
        setProperty("--header-top", "0px");
        setProperty("--avatar-top", "0px");
      }
    }

    async function updateAvatarStyles() {
      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = await clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = await clamp(x, fromX, toX);

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      );

      const borderScale = 1 / (toScale / scale);
      const borderX = (-toX + x) * borderScale;
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty("--avatar-border-transform", borderTransform);
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
    }

    function updateStyles() {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.value = false;
    }

    updateStyles();
    window.addEventListener("scroll", updateStyles, { passive: true });
    window.addEventListener("resize", updateStyles);

    cleanup(() => {
      window.removeEventListener("scroll", updateStyles);
      window.removeEventListener("resize", updateStyles);
    });
  });

  return (
    <>
      <div
        ref={avatarRef}
        class="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
      />
      <Container
        class="top-0 order-last -mb-3 pt-3"
        style={{ position: "var(--header-inner-position)" as "sticky" }}
      >
        <div
          class="top-[var(--avatar-top,theme(spacing.3))] w-full"
          style={{ position: "var(--header-inner-position)" as "sticky" }}
        >
          <div class="relative">
            <AvatarContainer
              class="absolute left-0 top-3 origin-left transition-opacity"
              style={{
                opacity: "var(--avatar-border-opacity, 0)",
                transform: "var(--avatar-border-transform)",
              }}
            />
            <Avatar
              large
              class="block h-16 w-16 origin-left"
              style={{ transform: "var(--avatar-image-transform)" }}
            />
          </div>
        </div>
      </Container>
    </>
  );
});

export const Header = component$(() => {
  const isHomePage = useLocation().url.pathname === "/";

  const headerRef = useSignal<HTMLElement>();

  return (
    <>
      <header
        class="pointer-events-none relative z-50 flex flex-none flex-col "
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && <AvatarComponent headerRef={headerRef} />}

        <div
          ref={headerRef}
          class="top-0 z-10 h-16 pt-6"
          style={{ position: "var(--header-inner-position)" as "sticky" }}
        >
          <Container
            class="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{ position: "var(--header-inner-position)" as "sticky" }}
          >
            <div class="relative flex gap-4">
              <div class="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div class="flex flex-1 justify-end md:justify-center">
                <MobileNavigation class="pointer-events-auto md:hidden" />
                <DesktopNavigation class="pointer-events-auto hidden md:block" />
              </div>
              <div class="flex justify-end md:flex-1">
                <div class="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div class="flex-none" style={{ height: "var(--content-offset)" }} />
      )}
    </>
  );
});
