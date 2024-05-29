import { Qclsx } from "@/lib/Qclsx";
import type { Component, QwikAttributes, LenientSVGProps, HtmlHTMLAttributes } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

const ChevronRightIcon = component$<LenientSVGProps<SVGSVGElement>>((props) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});

// fixme: this is a hack to get around the fact that we can't use
export const Card = component$<
QwikAttributes<HTMLElement> & HtmlHTMLAttributes<HTMLElement>  & {
    as?: keyof JSX.IntrinsicElements;
  }
>(({ class: className, ...props }) => {
  return (
    <div
      class={Qclsx(className, "group relative flex flex-col items-start")}
      {...props}
    >
      <Slot />
    </div>
  );
});

export const CardLink: Component<LinkProps> = component$(({ ...props }) => {
  return (
    <>
      <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span class="relative z-10">
          <Slot />
        </span>
      </Link>
    </>
  );
});

export const CardTitle = component$<
  QwikAttributes<HTMLElement> & {
    as?: keyof JSX.IntrinsicElements;
    href?: string;
  }
>(({ href }) => {
  return (
    <h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? (
        <CardLink href={href!}>
          <Slot />
        </CardLink>
      ) : (
        <Slot />
      )}
    </h2>
  );
});

export const CardDescription = component$(() => {
  return (
    <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      <Slot />
    </p>
  );
});

export const CardCta = component$(() => {
  return (
    <div
      aria-hidden="true"
      class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500 dark:text-violet-500"
    >
      <Slot />
      <ChevronRightIcon class="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
});

export const CardEyebrow = component$<
  QwikAttributes<HTMLElement> & {
    as?: keyof JSX.IntrinsicElements;
    decorate?: boolean;
    dateTime?: string;
  }
>(
  ({
    decorate = false,
    class: className,

    ...props
  }) => {
    return (
      <p
        class={Qclsx(
          className,
          "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
          decorate && "pl-3.5"
        )}
        {...props}
      >
        {decorate && (
          <span
            class="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
          >
            <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          </span>
        )}
        <Slot />
      </p>
    );
  }
);
