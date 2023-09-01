import { Qclsx } from "@/lib/Qclsx";
import { routes } from "@/lib/routes";
import type { HTMLAttributes, Signal } from "@builder.io/qwik";
import {
  $,
  Slot,
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import enterAnimation from "./HeaderMobil.css?inline";

const BackGround = component$<HTMLAttributes<HTMLElement>>(
  ({ class: ClassName, ...props }) => {
    return (
      <div
        class={Qclsx(
          "fixed inset-0 z-30 top-0 left-0 flex bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80 opacity-100",
          ClassName
        )}
        {...props}
      >
        <Slot />
      </div>
    );
  }
);

const MobileNavItem = component$<LinkProps>(
  ({ class: ClassName, ...props }) => {
    return (
      <li>
        <Link class={Qclsx("block py-2", ClassName)} {...props}>
          <Slot />
        </Link>
      </li>
    );
  }
);

export const Mobile = component$<{
  valueSignal: Signal<boolean>;
}>(({ valueSignal }) => {
  const hiddenDelay = useSignal(true);

  useVisibleTask$(({ track }) => {
    const value = track(() => valueSignal.value);
    if (value) {
      hiddenDelay.value = false;
    }
  });

  const onClose = $(() => {
    valueSignal.value = false;
    setTimeout(() => {
      hiddenDelay.value = true;
    }, 200);
  });

  useStylesScoped$(enterAnimation);

  return (
    <BackGround
      hidden={hiddenDelay.value}
      class={[
        {
          hidden: valueSignal.value ? !valueSignal.value : hiddenDelay.value,
          enterBg: valueSignal.value,
        },
      ]}
      onClick$={onClose}
    >
      <div
        class={[
          {
            enterContent: valueSignal.value,
            out: !valueSignal.value,
          },
          "fixed inset-x-4 top-8 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800 opacity-100",
        ]}
      >
        <div class="flex flex-row-reverse items-center justify-between">
          <button aria-label="Close menu" class="-m-1 p-1" type="button">
            <CloseIcon
              onClick$={onClose}
              class="h-6 w-6 text-zinc-500 dark:text-zinc-400"
            />
          </button>
          <h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Navigation
          </h2>
        </div>
        <nav class="mt-6">
          <ul class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
            {routes.map((item) => (
              <>
                <MobileNavItem href={item.path}>{item.name}</MobileNavItem>
              </>
            ))}
          </ul>
        </nav>
      </div>
    </BackGround>
  );
});

export const MobileNavigation = component$<HTMLAttributes<HTMLElement>>(
  (props) => {
    const isOpen = useSignal(false);

    return (
      <span {...props}>
        <button
          onClick$={() => {
            isOpen.value = true;
          }}
          class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
        >
          Menu
          <ChevronDownIcon class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
        </button>

        <Mobile valueSignal={isOpen} />
      </span>
    );
  }
);

const CloseIcon = component$<HTMLAttributes<HTMLElement>>((props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

const ChevronDownIcon = component$<HTMLAttributes<HTMLElement>>((props) => {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
