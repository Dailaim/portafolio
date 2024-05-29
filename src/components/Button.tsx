import { Qclsx } from "@/lib/Qclsx";
import type { Component, QwikAttributes } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

const variantStyles = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};


// type AnyComponetHTML = <T extends keyof HTMLElementTagNameMap >(props: { as: T }) => Component<QwikAttributes<HTMLElementTagNameMap[T]>> ;

// type AnyComponetExtend = <T extends Component<any>>(props: { as: T }) => T;

export const Button = component$<
  QwikAttributes<HTMLElement> & {
    as?: Component<any> | keyof HTMLElementTagNameMap;
    variant?: keyof typeof variantStyles;
    href?: string;
    target?: "_blank";
    class?: string;
    type?: "button" | "submit" | "reset";
    download?: string;
    rel?: string;
    size?: "sm" | "md" | "lg";


  }
>(
  ({
    variant = "primary",
    class: className,
    as = "button",
    ...props
  }) => {
    const style = Qclsx(
      "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
      variantStyles[variant],
      className
    );

    const Comp = as as any;

    return (
      <Comp class={style} {...props}>
        <Slot />
      </Comp>
    );
  }
);

// export type Tag = keyof JSX.IntrinsicElements;

// export type AnyComponent = {
// 	// <Any />
// 	(props: JSX.IntrinsicElements["div"] & PropsOf<typeof ButtonBasic>): JSX.Element;
// 	// <Any tag="div" />
// 	<T extends Tag>(
// 		props: JSX.IntrinsicElements[T] & PropsOf<typeof ButtonBasic> & { as: T },
// 	): JSX.Element;
// };

// export type AnyProxyComponent<T> = Component<T & PropsOf<typeof ButtonBasic>>;

// export type AnyProxy = AnyComponent & {
// 	// <Any.div />
// 	[K in keyof JSX.IntrinsicElements]: AnyProxyComponent<
// 		JSX.IntrinsicElements[K]
// 	>;
// };

// export const Button = new Proxy(ButtonBasic, {
// 	get:
// 		(_, tag: keyof HTMLElementTagNameMap | Component<any>): AnyProxyComponent<unknown> =>
// 		(props) =>
// 			<ButtonBasic as={tag} {...props}  />,
// }) as unknown as AnyProxy;
