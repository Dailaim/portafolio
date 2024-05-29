import type { HtmlHTMLAttributes, QwikAttributes } from "@builder.io/qwik"

export const Qclsx = (...className: (QwikAttributes<HTMLDivElement> | HtmlHTMLAttributes<HTMLDivElement>)["class"][] )=>{
  return className.flat() as QwikAttributes<HTMLElement>["class"]
}
