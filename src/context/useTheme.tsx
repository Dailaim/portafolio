import {
  $,
  Slot,
  component$,
  createContextId,
  useComputed$,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

import type { ThemeProviderProps, UseThemeProps } from "./types";

export const ThemeContext = createContextId<UseThemeProps>(
  "ThemeContext-fsdfgdas-fdsa"
);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = component$<ThemeProviderProps>(
  ({
    forcedTheme,
    disableTransitionOnChange = false,
    enableSystem = true,
    enableColorScheme = true,
    storageKey = "theme",
    themes = ["light", "dark"],
    defaultTheme = enableSystem ? "system" : "light",
    attribute = "data-theme",
    value,
    nonce,
  }) => {
    const theme = useSignal<string>();
    const resolvedTheme = useSignal<string>();
    const attrs = !value ? themes : Object.values(value);
    const colorSchemes = ["light", "dark"];
    const MEDIA = "(prefers-color-scheme: dark)";

    // const defaultThemes = ["light", "dark"];

    // helpers
    const getTheme = $((key: string, fallback?: string): string | undefined => {
      /* if (isServer) return undefined; */
      let theme;
      try {
        theme = localStorage.getItem(key!) || undefined;
      } catch (e) {
        // Unsupported
      }
      return theme || fallback;
    });

    const disableAnimation = $(() => {
      const css = document.createElement("style");
      css.appendChild(
        document.createTextNode(
          `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      );
      document.head.appendChild(css);

      return () => {
        // Force restyle
        (() => window.getComputedStyle(document.body))();

        // Wait for next tick before removing
        setTimeout(() => {
          document.head.removeChild(css);
        }, 1);
      };
    });

    const getSystemTheme = $((e?: MediaQueryList | MediaQueryListEvent) => {
      /* if (isServer) return undefined; */
      if (!e) e = window.matchMedia(MEDIA);
      const isDark = e.matches;
      const systemTheme = isDark ? "dark" : "light";
      return systemTheme;
    });

    const applyTheme = $(async (theme?: string) => {
      let resolved = theme;
      if (!resolved) return;
      // If theme is system, resolve it before setting them
      if (theme === "system" && enableSystem) {
        resolved = await getSystemTheme();
      }

      const name = value ? value[resolved!] : resolved;
      const enable = disableTransitionOnChange
        ? await disableAnimation()
        : null;
      const d = document.documentElement;

      if (attribute === "class") {
        d.classList.remove(...(attrs as string[]));

        if (name) d.classList.add(name);
      } else {
        if (name) {
          d.setAttribute(attribute, name);
        } else {
          d.removeAttribute(attribute);
        }
      }

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme)
          ? defaultTheme
          : null;
        const colorScheme = colorSchemes.includes(resolved!)
          ? resolved
          : fallback;
        // @ts-ignore
        d.style.colorScheme = colorScheme;
      }

      enable?.();
    });

    const setTheme = $((themeNew: string) => {
      theme.value = themeNew;

      // Save to storage
      try {
        localStorage.setItem(storageKey, theme.value as string);
      } catch (e) {
        // Unsupported
      }
    });

    // On first render, set theme to localStorage value
    useVisibleTask$(async () => {
      resolvedTheme.value = await getTheme(storageKey);
      theme.value = await getTheme(storageKey, defaultTheme);
    });

    // Always listen to System preference
    useVisibleTask$(async ({ cleanup }) => {
      // track(() => theme.value);

      const handleMediaQuery = $(
        async (e: MediaQueryListEvent | MediaQueryList) => {
          const resolved = await getSystemTheme(e);

          resolvedTheme.value = resolved;

          if (theme.value === "system" && enableSystem && !forcedTheme) {
            applyTheme("system");
          }
        }
      );

      const media = window.matchMedia(MEDIA);

      // Intentionally use deprecated listener methods to support iOS & old browsers
      media.addEventListener("change", handleMediaQuery);
      handleMediaQuery(media);

      cleanup(() => media.removeEventListener("change", handleMediaQuery));
    });

    // localStorage event handling
    useVisibleTask$(({ cleanup }) => {
      const handleStorage = (e: StorageEvent) => {
        if (e.key !== storageKey) {
          return;
        }
        // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
        const theme = e.newValue || defaultTheme;
        setTheme(theme);
      };

      window.addEventListener("storage", handleStorage);

      cleanup(() => window.removeEventListener("storage", handleStorage));
    });

    // Whenever theme or forcedTheme changes, apply it
    useVisibleTask$(({ track }) => {
      track(() => theme.value);
      track(() => forcedTheme);

      applyTheme(forcedTheme ?? theme.value);
    });

    const Store = useStore<UseThemeProps>({
      theme: useComputed$(() => theme.value),
      setTheme,
      forcedTheme,
      resolvedTheme: useComputed$(() =>
        theme.value === "system" ? resolvedTheme.value : theme.value
      ),
      themes: (enableSystem ? [...themes, "system"] : themes) as string[],
      systemTheme: (enableSystem ? resolvedTheme : undefined) as
        | "light"
        | "dark"
        | undefined,
    });

    // Link context to store
    useContextProvider(ThemeContext, Store);

    return (
      <>
        <ThemeScript
          {...{
            forcedTheme,
            disableTransitionOnChange,
            enableSystem,
            enableColorScheme,
            storageKey,
            themes,
            defaultTheme,
            attribute,
            value,
            attrs,
            nonce,
            colorSchemes,
            MEDIA,
          }}
        />
        <Slot />
      </>
    );
  }
);

export const ThemeScript = component$(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    attrs,
    nonce,
    colorSchemes,
    MEDIA,
  }: ThemeProviderProps & {
    attrs: string[];
    defaultTheme: string;
    colorSchemes: string[];
    MEDIA: string;
  }) => {
    const defaultSystem = defaultTheme === "system";

    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      if (attribute === "class") {
        const removeClasses = `c.remove(${attrs
          .map((t: string) => `'${t}'`)
          .join(",")})`;

        return `var d=document.documentElement,c=d.classList;${removeClasses};`;
      } else {
        return `var d=document.documentElement,n='${attribute}',s='setAttribute';`;
      }
    })();

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return "";
      }

      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null;

      if (fallback) {
        return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`;
      } else {
        return `if(e==='light'||e==='dark')d.style.colorScheme=e`;
      }
    })();

    const updateDOM = (
      name: string,
      literal: boolean = false,
      setColorScheme = true
    ) => {
      const resolvedName = value ? value[name] : name;
      const val = literal ? name + `|| ''` : `'${resolvedName}'`;
      let text = "";

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (
        enableColorScheme &&
        setColorScheme &&
        !literal &&
        colorSchemes.includes(name)
      ) {
        text += `d.style.colorScheme = '${name}';`;
      }

      if (attribute === "class") {
        if (literal || resolvedName) {
          text += `c.add(${val})`;
        } else {
          text += `null`;
        }
      } else {
        if (resolvedName) {
          text += `d[s](n,${val})`;
        }
      }

      return text;
    };

    const scriptSrc = (() => {
      if (forcedTheme) {
        return `!function(){${optimization}${updateDOM(forcedTheme)}}()`;
      }

      if (enableSystem) {
        return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
          "dark"
        )}}else{${updateDOM("light")}}}else if(e){${
          value ? `var x=${JSON.stringify(value)};` : ""
        }${updateDOM(value ? `x[e]` : "e", true)}}${
          !defaultSystem
            ? `else{` + updateDOM(defaultTheme, false, false) + "}"
            : ""
        }${fallbackColorScheme}}catch(e){}}()`;
      }

      return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${
        value ? `var x=${JSON.stringify(value)};` : ""
      }${updateDOM(value ? `x[e]` : "e", true)}}else{${updateDOM(
        defaultTheme,
        false,
        false
      )};}${fallbackColorScheme}}catch(t){}}();`;
    })();

    return <script nonce={nonce} dangerouslySetInnerHTML={scriptSrc} />;
  }
);
