import { Container } from "@/components/Container";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/SocialIcons";
import ImgPortrait from "@/images/portrait.webp?jsx";
import { Qclsx } from "@/lib/Qclsx";
import type {
  FunctionComponent,
  HTMLAttributes,
  JSXNode,
} from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { Link, type DocumentHead, type LinkProps } from "@builder.io/qwik-city";

const SocialLink = component$<
  HTMLAttributes<HTMLAnchorElement> &
    LinkProps & {
      icon: JSXNode<string | FunctionComponent<Record<string, any>>> | any;
    }
>(({ class: className, href, icon: Icon }) => {
  return (
    <li class={Qclsx(className, "flex")}>
      <Link
        href={href}
        class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-violet-500"
      >
        <Icon class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500 dark:group-hover:fill-violet-500" />
        <span class="ml-4">
          <Slot />
        </span>
      </Link>
    </li>
  );
});

const MailIcon = component$((props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
});

export const head: DocumentHead = {
  title: "About",
  meta: [
    {
      name: "description",
      content:
        "I’m Spencer Sharp. I live in New York City, where I design the future.",
    },
    {
      name: "og:title",
      content: "About",
    },
    {
      name: "og:description",
      content:
        "I’m Spencer Sharp. I live in New York City, where I design the future.",
    },
  ],
};

export default component$(() => {
  return (
    <Container class="mt-16 sm:mt-32">
      <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div class="lg:pl-20">
          <div class="max-w-xs px-2.5 lg:max-w-none">
            <ImgPortrait
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 animate-fade animate-once animate-ease-in-out animate-alternate animate-fill-forwards"
            />
          </div>
        </div>
        <div class="lg:order-first lg:row-span-2">
          <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            In a World of Pixels and Petals: I'm Leonardo Iglesias, Coding
            'Flor' the Future.
          </h1>
          <div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              As a developer, I see beyond just lines of code, finding beauty in
              the finer details, much like the flowers that inspire me every
              day. Born and raised in Colombia, I've melded my passion for
              technology with my love for nature, leading to projects that
              bridge these two worlds. Every creation stands as a testament to
              my commitment to innovation and my aspiration to contribute a
              unique touch to the vast digital cosmos.
            </p>
            <p>
              From my early days in programming, I've been enamored with the
              potential of turning abstract ideas into tangible realities. This
              enthusiasm has drawn me deep into the realm of AI-driven photo
              editing, where technical precision meets artistry.
            </p>
            <p class="text-justify">
              <span class="dark:bg-violet-800 dark:text-purple-300 bg-teal-200 text-teal-900 px-2 rounded-md">
                With two years of experience
              </span>{" "}
              under my belt, my confidence has only grown. No challenge seems
              insurmountable, and I believe wholeheartedly that I can take on
              any task that comes my way. My code isn't just a set of machine
              instructions; it's an extension of who I am, my interests, and how
              I perceive the world. Each project is a further step in my
              journey, and through my open-source endeavors, I invite others to
              join me—to explore, contribute, and keep learning together.
            </p>
          </div>
        </div>
        <div class="lg:pl-20">
          <ul role="list">
            {/* <SocialLink href="#" icon={TwitterIcon}>
              Follow on Twitter
            </SocialLink> */}
            <SocialLink
              href="https://www.instagram.com/daizaikun/"
              icon={InstagramIcon}
              class="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/Daizaikun"
              icon={GitHubIcon}
              class="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/daizai"
              icon={LinkedInIcon}
              class="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:spencer@planetaria.tech"
              icon={MailIcon}
              class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              Laiglesias.min@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
});
