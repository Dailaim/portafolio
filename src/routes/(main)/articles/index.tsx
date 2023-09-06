import {
  Card,
  CardCta,
  CardDescription,
  CardEyebrow,
  CardTitle,
} from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { formatDate } from "@/lib/formatDate";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import articles from "@/routes/articles.json";
import type { DocumentHead } from "@builder.io/qwik-city";
import { animate, stagger } from "motion";

const Article = component$<{
  description: string;
  title: string;
  date: string;
  slug: string;
  delay: number;
}>(({ date, description, slug, title, delay }) => {
  const divSig = useSignal<HTMLElement>();

  useVisibleTask$(() => {
    if (!divSig.value) return;
    animate(
      divSig.value,
      {
        opacity: 1,
        transform: "translate3d(0, 20%, 0)",
      },
      { delay: stagger(delay * 100) }
    );
  });

  return (
    <article
      ref={divSig}
      style={{
        opacity: 0,
      }}
      class={["md:grid md:grid-cols-4 md:items-baseline "]}
    >
      <Card class="md:col-span-3">
        <CardTitle href={`/articles/${slug}`}>{title}</CardTitle>
        <CardEyebrow as="time" dateTime={date} class="md:hidden" decorate>
          {formatDate(date)}
        </CardEyebrow>
        <CardDescription>{description}</CardDescription>
        <CardCta>Read article</CardCta>
      </Card>
      <CardEyebrow as="time" dateTime={date} class="mt-1 hidden md:block">
        {formatDate(date)}
      </CardEyebrow>
    </article>
  );
});

export default component$(() => {
  return (
    <SimpleLayout
      title="Floral Codes & Digital Brushes: Tales of Software, AI-driven Art, and Life's Vibrant Palette."
      intro="My reflections on weaving code with artistry, leading digital endeavors, crafting product experiences, and the rhythmic dance of life, all presented in sequence."
    >
      <div
        class={[
          "md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40",
        ]}
      >
        <div class={["flex max-w-3xl flex-col space-y-16 "]}>
          {articles.map((article, index) => (
            <Article key={article.slug} {...article} delay={index + 1} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      name: "description",
      content:
        "Delving into the fusion of coding artistry, AI-driven imagery, leadership insights, and life's vibrant hues, from one chapter to the next.",
    },
  ],
  title: "Leonardo's Chronicles",
};
