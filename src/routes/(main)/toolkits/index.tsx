import { Card, CardDescription, CardTitle } from "@/components/Card";
import { Section } from "@/components/Section";
import { SimpleLayout } from "@/components/SimpleLayout";
import { Slot, component$ } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";

const ToolsSection = component$<{
  title: string;
}>((props) => {
  return (
    <Section {...props}>
      <ul role="list" class="space-y-16">
        <Slot />
      </ul>
    </Section>
  );
});

const Tool = component$<
  LinkProps & {
    title: string;
  }
>(({ title, href }) => {
  return (
    <Card as="li">
      <CardTitle as="h3" href={href}>
        {title}
      </CardTitle>
      <CardDescription>
        <Slot />
      </CardDescription>
    </Card>
  );
});

export const head = {
  title: "Developer Toolkits",
  meta: [
    {
      name: "description",
      content: "My Developer Toolkit: Software, Gadgets, and Must-Haves.",
    },
  ],
};

export default component$(() => {
  return (
    <SimpleLayout
      title="My Developer Toolkit: Software, Gadgets, and Must-Haves."
      intro="Fellow developers and colleagues often inquire about the tools and technologies that drive my daily work and innovations. From creating efficient web applications to optimizing productivity, here's a curated list of tools and gadgets that resonate with my developer journey and ethos."
    >
      <div class="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="Laptop Asus TUF Gaming F15, 32GB RAM">
            My Asus TUF Gaming F15 isn't just a device, it's my digital anchor.
            Beyond its undeniable speed, it's the rock I rely on for hefty
            projects. When I dive into mobile programming with those pesky
            emulators, it doesn't even flinch. I can confidently say this laptop
            combines grit, grace, and power in a sleek package.
          </Tool>

          <Tool title="HP Monitor M27fq QHD">
            Ever lay eyes on something and think, "This is it!"? That was me
            with the HP Monitor M27fq. With jaw-dropping QHD resolution, every
            task feels like a visual treat. Its 27" canvas has become my
            playground for vibrant visuals and meticulous tasks. It's not just a
            screen; it's a window to a world of clarity.
          </Tool>

          <Tool title="Logitech G305 Mouse">
            Ah, the Logitech G305, a mouse that feels more like an old friend.
            Its snappy response and ergonomic design make every task a breeze.
            And trust me, whenever there's a sale, I’m hoarding them! It's not
            about them wearing out—it's about always having this reliable
            companion by my side. An undeniable gem in my gadget collection.
          </Tool>

          <Tool title="Wacom Intuos">
            Sketching, designing, or just jotting down ideas, the Wacom Intuos
            feels like an extension of my hand. The responsiveness and precision
            are unmatched. It's transformed my creative process, allowing me to
            visualize and manifest my ideas in ways I'd never imagined. It's
            more than just a tablet; it's my canvas.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="VScode">
            Some might rave about other editors, but for me, VScode is where the
            magic happens. It strikes the perfect balance between simplicity and
            power. With a vast array of extensions and an intuitive interface,
            it has redefined coding for me. Pure elegance combined with robust
            functionality!
          </Tool>
          <Tool title="Windows Terminal">
            Windows Terminal's customizable interface and array of powerful
            features have quickly made it my go-to. While it might share
            similarities with other terminals, there's a unique charm to it that
            just resonates with my workflow.
          </Tool>
          <Tool title="Chocolatey">
            As a developer with extensive experience across various environments
            and technologies, I deeply value tools that simplify and streamline
            my workflows. Chocolatey has been an invaluable addition in this
            regard. It's more than just a package manager for Windows; it's a
            comprehensive solution that allows me to manage and maintain all my
            tools and dependencies with astounding ease. In the fast-paced world
            of modern development, Chocolatey is the silent ally ensuring I
            always have the right tools at my fingertips.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
});
