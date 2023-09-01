import { SimpleLayout } from "@/components/SimpleLayout";
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const head: DocumentHead = {
  title: "You’re subscribed",
  meta: [
    {
      name: "description",
      content: "Thanks for subscribing to my newsletter.",
    },
  ],
};

export default component$(() => {
  return (
    <SimpleLayout
      title="Thanks for subscribing."
      intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
    />
  );
});
