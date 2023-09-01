import { frontmatter as uno } from "@/routes/articles/(article)/crafting-a-design-system-for-a-multiplanetary-future/index.mdx"
import { frontmatter as dos } from "@/routes/articles/(article)/introducing-animaginary/index.mdx"
import { frontmatter as tres } from "@/routes/articles/(article)/rewriting-the-cosmos-kernel-in-rust/index.mdx"
import { server$ } from "@builder.io/qwik-city"

export const getAllArticles = server$(()=> {
  const articleFilenames = [
    uno,
    dos,
    tres
  ]

  
})
