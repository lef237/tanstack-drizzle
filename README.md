# TanStack Drizzle

**Full-Stack TypeScript Framework**

Recommended for those who want to use the following technology stack!

- React
- TypeScript
- TanStack Router
  - Server Functions
- Database
  - PostgreSQL
- Drizzle ORM
- Zod

## Main Features

**Server Functions**, which are available in _TanStack Start_, can be used to invoke server-side functions from the client side.

Therefore, you can operate the database without using API Routes.

It uses Zod and Drizzle ORM, and is unified with TypeScript, so you can write code in a type-safe way.

## How to set up

You can clone this repository and install the dependencies.

```sh
gh repo clone lef237/tanstack-drizzle
cd tanstack-drizzle
npm install
```

You must prepare a database beforehand. If you follow the documentation here, you can easily prepare it in Docker (Docker Desktop is required).

- https://orm.drizzle.team/docs/guides/postgresql-local-setup

Once you have created the database, you can now place the `.env` file in the root of your project.

Below is Sample.

```env
DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres
```

Next, use the Drizzle Kit to create the table in the database.

```sh
npx drizzle-kit push
```

Finally, run the following code to launch TanStack Drizzle!

```sh
npm run dev
```

<details><summary>Initial README.md</summary>

This is the contents of README.md that will be displayed when you run the following code:

```sh
npx degit https://github.com/tanstack/router/examples/react/start-basic start-basic
```

- https://tanstack.com/start/latest/docs/framework/react/quick-start#impatient

---

## Welcome to TanStack.com!

This site is built with TanStack Router!

- [TanStack Router Docs](https://tanstack.com/router)

It's deployed automagically with Netlify!

- [Netlify](https://netlify.com/)

## Development

From your terminal:

```sh
pnpm install
pnpm dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Editing and previewing the docs of TanStack projects locally

The documentations for all TanStack projects except for `React Charts` are hosted on [https://tanstack.com](https://tanstack.com), powered by this TanStack Router app.
In production, the markdown doc pages are fetched from the GitHub repos of the projects, but in development they are read from the local file system.

Follow these steps if you want to edit the doc pages of a project (in these steps we'll assume it's [`TanStack/form`](https://github.com/tanstack/form)) and preview them locally :

1. Create a new directory called `tanstack`.

```sh
mkdir tanstack
```

2. Enter the directory and clone this repo and the repo of the project there.

```sh
cd tanstack
git clone git@github.com:TanStack/tanstack.com.git
git clone git@github.com:TanStack/form.git
```

> [!NOTE]
> Your `tanstack` directory should look like this:
>
> ```
> tanstack/
>    |
>    +-- form/
>    |
>    +-- tanstack.com/
> ```

> [!WARNING]
> Make sure the name of the directory in your local file system matches the name of the project's repo. For example, `tanstack/form` must be cloned into `form` (this is the default) instead of `some-other-name`, because that way, the doc pages won't be found.

3. Enter the `tanstack/tanstack.com` directory, install the dependencies and run the app in dev mode:

```sh
cd tanstack.com
pnpm i
# The app will run on https://localhost:3000 by default
pnpm dev
```

4. Now you can visit http://localhost:3000/form/latest/docs/overview in the browser and see the changes you make in `tanstack/form/docs`.

> [!NOTE]
> The updated pages need to be manually reloaded in the browser.

> [!WARNING]
> You will need to update the `docs/config.json` file (in the project's repo) if you add a new doc page!

</details>
