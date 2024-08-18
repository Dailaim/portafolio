/* eslint-disable qwik/jsx-img */
import { Button } from "@/components/Button";
import {
  Card,
  CardCta,
  CardDescription,
  CardEyebrow,
  CardTitle,
} from "@/components/Card";
import { Container } from "@/components/Container";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/SocialIcons";

import RecyclingLogo from "@/images/logos/recycling.webp?jsx";

import NutriaSoftLogo from "@/images/logos/nutriasoft.svg?jsx";
import image5 from "@/images/photos/Amber312.png?jsx";
import image5Dark from "@/images/photos/Blue2.png?jsx";
import image4 from "@/images/photos/bellesarosa.png?jsx";
import image2Dark from "@/images/photos/blue.png?jsx";
import image3Dark from "@/images/photos/centerDark.png?jsx";
import image1Dark from "@/images/photos/cityFlowers.png?jsx";
import image3 from "@/images/photos/principal.png?jsx";
import image2 from "@/images/photos/theamber.png?jsx";
import image1 from "@/images/photos/therose.png?jsx";
import image4Dark from "@/images/photos/thewhite.png?jsx";
import { Qclsx } from "@/lib/Qclsx";
import { formatDate } from "@/lib/formatDate";
import type { LenientSVGProps, QwikAttributes } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { DocumentHead, LinkProps } from "@builder.io/qwik-city";
import { Link, useNavigate } from "@builder.io/qwik-city";

import articles from "../articles.json";

const MailIcon = component$<LenientSVGProps<SVGSVGElement>>(({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        class="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
});

const BriefcaseIcon = component$<LenientSVGProps<SVGSVGElement>>((props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        class="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
});

const ArrowDownIcon = component$<QwikAttributes<SVGSVGElement>>((props) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});

const Article = component$<{
  description: string;
  title: string;
  date: string;
  slug: string;
}>(({ description, title, date, slug }) => {
  return (
    <Card as="article">
      <CardTitle href={`/articles/${slug}`}>{title}</CardTitle>
      <CardEyebrow as="time" dateTime={date} decorate>
        {formatDate(date)}
      </CardEyebrow>
      <CardDescription>{description}</CardDescription>
      <CardCta>Read article</CardCta>
    </Card>
  );
});

const SocialLink = component$<
  LinkProps & {
    Icon: any;
    alt?: string;
  }
>(({ Icon, alt, ...props }) => {
  return (
    <Link class="group -m-1 p-1" {...props}>
      <Icon
        alt={alt}
        class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
      />
    </Link>
  );
});

const Newsletter = component$(() => {
  return (
    <form
      action="/thank-you"
      class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon class="h-6 w-6 flex-none" />
        <span class="ml-3">Stay up to date</span>
      </h2>
      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div class="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          class="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="button" class="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  );
});

const Resume = component$(() => {
  const resume = [
    {
      company: "NutriaSoft (FaztCommunity)",
      title: "Backend Developer",
      Logo: NutriaSoftLogo,
      start: {
        label: undefined,
        dateTime: "2023",
      },
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: "Flash Gas",
      title: "Tech Lead Software Engineer",
      Logo: "https://flashgas.com/wp-content/uploads/2022/12/cropped-FLAMA-32x32.png",
      start: {
        label: undefined,
        dateTime: "2023",
      },
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: "Recycling Bikes",
      title: "Full-Stack Software Engineer",
      Logo: RecyclingLogo,
      start: { dateTime: "2021" },
      end: { dateTime: "2023" },
    },
    {
      company: "Fazt Community",
      title: "Software Engineer",
      Logo: "https://faztcommunity.club/favicon.png",
      start: { dateTime: "2020" },
      end: { dateTime: "2021" },
    },
  ];

  return (
    <div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon class="h-6 w-6 flex-none" />
        <span class="ml-3">Work</span>
      </h2>
      <ol class="mt-6 space-y-4">
        {resume.map(({ Logo, ...role }, roleIndex) => (
          <li key={roleIndex} class="flex gap-4">
            <div class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {typeof Logo === "string" ? (
                  <img
                    src={Logo}
                    alt={role.company}
                   height={28}
                    width={28}
                    class="rounded-full h-7 w-7"
                  />
                ) : (
                  <Logo class="h-7 w-7" alt={`${role.company} Icon`} />
                )
              }
              
            </div>
            <dl class="flex flex-auto flex-wrap gap-x-2">
              <dt class="sr-only">Company</dt>
              <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt class="sr-only">Role</dt>
              <dd class="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt class="sr-only">Date</dt>
              <dd
                class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start.dateTime} until ${
                  role.end.label ?? role.end.label
                }`}
              >
                <time dateTime={role.start.dateTime}>
                  {role.start.label ?? role.start.dateTime}
                </time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time dateTime={role.end.dateTime}>
                  {role.end.label ?? role.end.dateTime}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button 
        as={Link}
        href="/cv3.pdf"
        download="Leonardo-CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        type="button"
        size="lg"
      variant="secondary" class="group mt-6 w-full">
        Download CV
        <ArrowDownIcon class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
});

const Photos = component$(() => {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  const nav = useNavigate();

  const images = [
    {
      light: image1,
      dark: image1Dark,
      linkLight: "/one-more-time",
    },
    {
      light: image2,
      dark: image2Dark,
    },
    {
      light: image3,
      dark: image3Dark,
    },
    {
      light: image4,
      dark: image4Dark,
      linkDark: "/the-white",
    },
    {
      light: image5,
      dark: image5Dark,
    },
  ]

  return (
    <div class="mt-16 sm:mt-20">
      <div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((Image, imageIndex) => {
          const { linkLight, linkDark } = Image;
          return (
            <div
              key={`${imageIndex}+imageMain`}
              class={Qclsx(
                "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
                rotations[imageIndex % rotations.length]
              )}
            >
              <button
                  onClick$={() => {
                  if (!linkLight && !linkDark) return;
                  nav(linkLight ?? linkDark);
                }}
              >

              <Image.dark
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                class="absolute inset-0 h-full w-full object-cover hidden dark:block animate-fade animate-once animate-ease-in-out animate-alternate animate-fill-forwards"
                />
              <Image.light
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                class="absolute inset-0 h-full w-full object-cover dark:hidden animate-fade animate-once animate-ease-in-out animate-alternate animate-fill-forwards"
                />
                </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default component$(() => {
  return (
    <>
      <Container class="mt-9">
        <div class="max-w-2xl">
          <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl ">
            Software developer passionate about AI-driven photo editing and
            inspired by the beauty of flowers
          </h1>
          <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400 text-justify">
            I'm Leonardo, a software developer who blends the art of artificial
            intelligence with aesthetics. From Colombia, I've revolutionized
            photo editing with AI, always drawing inspiration from the delicate
            beauty of flowers. My career has been marked by bold innovations,
            cutting-edge technologies, and an unwavering commitment to
            excellence. Welcome to my digital journey!
          </p>
          <div class="mt-6 flex gap-6">
            <SocialLink
              href="https://instagram.com"
              aria-label="Follow on Instagram"
              Icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/Dailaim"
              aria-label="Follow on GitHub"
              Icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/daizai"
              aria-label="Follow on LinkedIn"
              Icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container class="mt-24 md:mt-28">
        <div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div class="flex flex-col gap-16">
            {articles
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 3)
              .map((article) => (
                <Article key={article.slug} {...article} />
              ))}
          </div>
          <div class="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
});

export const head: DocumentHead = {
  title:
    "Software developer passionate about AI-driven photo editing and inspired by the beauty of flowers",
  meta: [
    {
      name: "description",
      content: `I'm Leonardo, a software developer who blends the art of artificial
        intelligence with aesthetics. From Colombia, I've revolutionized
        photo editing with AI, always drawing inspiration from the delicate
        beauty of flowers. My career has been marked by bold innovations,
        cutting-edge technologies, and an unwavering commitment to
        excellence. Welcome to my digital journey!`,
    },
  ],
};
