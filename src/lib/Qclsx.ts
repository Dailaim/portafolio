import type { HTMLAttributes } from "@builder.io/qwik"

export const Qclsx = (...className: HTMLAttributes<HTMLDivElement>["class"][])=>{
  return className.flat() as HTMLAttributes<HTMLDivElement>["class"]
}
