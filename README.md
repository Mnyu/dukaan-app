# DUKAAN-APP

This is an e-commerce app with an admin dashboard and a user facing dashboard using Turborepo in a single monorepo.

## Local Setup

### Prerequisites

- Mongo DB running either locally or on cloud.
- A super secret key to be used for JWT signature

### Steps

1. Clone the repository locally.
   ```
   git clone git@github.com:Mnyu/dukaan-app.git
   ```
2. Open the folder `dukaan-app` in VSCode.

3. Inside `apps -> api` folder, create a copy of `.env.example` with file name as `.env`.

4. In the `.env` file, replace the values of `MONGO_URI`, `JWT_SECRET` and `JWT_LIFETIME` (possible values 60, 1h, 1d) as per your environment.

5. Open new terminal in VSCode and run

   ```
   yarn install
   ```

6.

```
cd packages/common/
yarn build
```

7.

```
cd ../store/
yarn build
```

6. Now run

   ```
   cd ../..
   yarn run dev
   ```

7. Following statements should be visible in logs : <br>
   `Database connection successful.` <br>
   `Server is listening on port 5000...`

8. Admin Dashboard : `http://localhost:3000/` <br>
   User Dashboard : `http://localhost:3001/`

---

### Known Issues :

1. `yarn run build` - throws following error at `dukaan-app` level :

```
docs:build: ReferenceError: document is not defined
docs:build:     at getUrlBasedHistory (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/docs/.next/server/chunks/876.js:406:14)
docs:build:     at Object.createBrowserHistory (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/docs/.next/server/chunks/876.js:239:10)
docs:build:     at exports.modules.8292.e.BrowserRouter (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/docs/.next/server/chunks/876.js:20055:14758)
docs:build:     at Ue (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:113:273)
docs:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:91)
docs:build:     at Ve (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:123:155)
docs:build:     at Xe (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:122:289)
docs:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:350)
docs:build:     at Ue (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:118:191)
docs:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:91)
web:build: ReferenceError: document is not defined
web:build:     at getUrlBasedHistory (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/web/.next/server/chunks/876.js:406:14)
web:build:     at Object.createBrowserHistory (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/web/.next/server/chunks/876.js:239:10)
web:build:     at exports.modules.8292.e.BrowserRouter (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/web/.next/server/chunks/876.js:20053:14758)
web:build:     at Ue (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:113:273)
web:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:91)
web:build:     at Ve (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:123:155)
web:build:     at Xe (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:122:289)
web:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:350)
web:build:     at Ue (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:118:191)
web:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:91)
docs:build:
docs:build: Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
docs:build: ReferenceError: document is not defined
docs:build:     at getUrlBasedHistory (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/docs/.next/server/chunks/876.js:406:14)
docs:build:     at Object.createBrowserHistory (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/docs/.next/server/chunks/876.js:239:10)
docs:build:     at exports.modules.8292.e.BrowserRouter (/Users/abhimgup/manyu/react/cohort/dukaan-app/apps/docs/.next/server/chunks/876.js:20055:14758)
docs:build:     at Ue (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:113:273)
docs:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:91)
docs:build:     at Ve (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:123:155)
docs:build:     at Xe (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:122:289)
docs:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:350)
docs:build:     at Ue (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:118:191)
docs:build:     at Z (/Users/abhimgup/manyu/react/cohort/dukaan-app/node_modules/next/dist/compiled/react-dom/cjs/react-dom-server.edge.production.min.js:120:91)
```

<br><br>

=========================================================================

## TURBOREPO README

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
