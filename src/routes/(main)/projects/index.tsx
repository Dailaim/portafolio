import { Card, CardDescription, CardLink } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import type { HTMLAttributes } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const logoCosmos = "/assets/svg/bibleApp.jpeg";
const logoOpenShuttle = "/assets/svg/open-shuttle.svg";
const tsparticles = "/assets/svg/tsparticles.jpeg";
const RecyclingBikes = "/assets/svg/recycling.webp";

export const projects = [
  {
    name: "TS-Particles",
    description: "A lightweight TypeScript library for creating particles.",
    link: { href: "https://github.com/tsparticles", label: "github.com" },
    logo: tsparticles,
  },
  {
    name: "Recycling Bikes",
    description:
      "E-commerce platform specialized in the resale of bicycles, optimized for cycling enthusiasts and outdoor adventures.",
    link: {
      href: "https://www.recyclingbikes.co/",
      label: "recyclingbikes.co",
    },
    logo: RecyclingBikes,
  },
  {
    name: "Biblia App",
    description: "The largest and most comprehensive Bible API in Spanish.",
    link: {
      href: "https://bible-study.vercel.app/",
      label: "bible-study.vercel.app",
    },
    logo: logoCosmos,
  },
  {
    name: "GitHub User Explorer",
    description:
      "A user-friendly tool to dive deep into GitHub profiles and curate your favorite selections.",
    link: {
      href: "https://github.com/Dailaim/GitHub-User-Explorer/",
      label: "github.com",
    },
    logo: logoOpenShuttle,
  },
  {
    name: "Component party dev",
    description:
      "A component party dev to build your own components and share them with the world.",
    link: {
      href: "https://component-party.dev/",
      label: "component-party.dev",
    },
  },
  {
    name: "Sticky Board",
    description:
      "A simple sticky board to keep track of your notes and tasks.",
    link: {
      href: "https://github.com/Dailaim/notes-app",
      label: "github.com",
    },
  }
];

const LinkIcon = component$<HTMLAttributes<HTMLElement>>((props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      name: "description",
      content:
        "Where Flora Meets Function: The Works That Reflect My Quest in the Tech Realm",
    },
  ],
  title: "Projects",
};

export default component$(() => {
  return (
    <SimpleLayout
      title="From Concept to Code: Projects Shaping My Legacy in the Digital Expanse."
      intro="Throughout my journey, blending the beauty of flowers with the logic of code, I've ventured into myriad projects. Here are the ones that resonate most deeply with my passion and vision. Many are open-source, waiting for curious minds to explore and contribute."
    >
      <ul
        role="list"
        class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map(({ logo: Logo, ...project }) => (
          <Card as="li" key={project.name}>
            <div class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {Logo && <img
                src={Logo}
                alt={project.name}
                height={32}
                width={32}
                class="rounded-full"
              />}
              {
                !Logo && <span>
                  🎉
                </span>
              }
            </div>
            <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <CardLink target="_blank" href={project.link.href}>{project.name}</CardLink>
            </h2>
            <CardDescription>{project.description}</CardDescription>
            <p class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:group-hover:text-violet-500 dark:text-zinc-200">
              <LinkIcon class="h-6 w-6 flex-none" />
              <span class="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  );
});
