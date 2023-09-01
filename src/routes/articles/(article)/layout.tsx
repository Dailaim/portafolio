import { ArticleLayout } from "@/components/ArticleLayout";
import { myName } from "@/lib/const";
import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$, useDocumentHead } from "@builder.io/qwik-city";

export const useData = routeLoader$(async ({ params }) => {
  return params.article;
});

export default component$(() => {
  const data = useDocumentHead();

  return (
    <ArticleLayout
      title={data.title.replace(`- ${myName}`, "")}
      date={data.frontmatter.date ?? "2021"}
    >
      <Slot />
    </ArticleLayout>
  );
});
