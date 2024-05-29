import type { QwikAttributes } from "@builder.io/qwik"

export const Qclsx = (...className: QwikAttributes<HTMLDivElement>["class"][])=>{
  return className.flat() as QwikAttributes<HTMLElement>["class"]
}
