# CleverKit

Everything you need to build a Svelte project with a modern toolchain.

## Creating a project

Clone this repo and install dependencies:

```bash
npx degit justmrmendez/cleverkit my-app
cd my-app
npm install
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install`), start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `npm preview`.

> To deploy your frontend, you may need to install we recommend [Vercel](https://vercel.com/).
> To deploy your backend, you may need to install [Fly.io](https://fly.io/) CLI.


## Stack

- [SvelteKit](https://kit.svelte.dev/) - The way to build apps, nothing else to say
- TypeScript - It's 2023, use TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - Because utility classes are awesome
- [ESLint](https://eslint.org/) - For Linting and formatting
- [Prettier](https://prettier.io/) - Why not?
- [Pocketbase](https://pocketbase.io/) - > The Ultimate Side Project Database < by [Fireship](https://fireship.io/)
- [Fly.io](https://fly.io/) - For hosting the backend made with [Pocketbase](https://pocketbase.io/) as a framework
- [Vercel](https://vercel.com/) - For hosting the frontend made with [SvelteKit](https://kit.svelte.dev/)
- [Skeleton](https://skeleton.dev/) - Ui Framework on top of Tailwind CSS

## Features

- [x] Dark & Light Mode
- [x] Authentication with [Pocketbase](https://pocketbase.io/)
- [x] Easy theming by [Skeleton](https//skeleton.dev/)