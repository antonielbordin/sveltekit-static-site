# sveltekit-static-site

> Minimal boilerplate [SvelteKit](https://kit.svelte.dev/) set-up made deployable to [GitHub Pages](https://username.github.io/sveltekit-static-site/) or static hosting


## 1) Use the static adapter

Use the [SvelteKit static adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) to prerender the app.

**package.json**

```diff
  "devDependencies": {
+   "@sveltejs/adapter-static": "next",
    "@sveltejs/kit": "next",
    "svelte": "^3.46.4"
  }
```

**svelte.config.js**

```diff
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
+   adapter: adapter(),
+   prerender: {
+     default: true,
+   },
  },
};

export default config;

```

## 2) Modify `paths.base` in the config

- `kit.paths.base` should be your repo URL subpath (see the [Vite docs](https://vitejs.dev/guide/static-deploy.html#github-pages))

```diff
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
+ /*  
+  // enable this base url for publish in github pages  
+  paths: {
+     base: process.env.NODE_ENV === "production" ? "/sveltekit-static-site" : "",
+   },
+ */
  },
};

export default config;

```

**Note:** You will also need to prepend relative paths with the [SvelteKit `base` path](https://kit.svelte.dev/docs/modules#$app-paths) so that your app can build successfully for production.

```svelte
<script>
  import { base } from '$app/paths';
</script>

 <a href="{base}/about">About</a>
```

## 3) Add a `.nojekyll` file to the build

The last step is to add a `.nojekyll` file to the build folder to [bypass Jekyll on GitHub Pages](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/).

**package.json**

```json
{
  "scripts": {
    "dev": "svelte-kit dev",
    "build": "svelte-kit build",
    "deploy-gh-pages": "rm -rf docs && svelte-kit build && touch build/.nojekyll && cp -r build docs"
  }
}
```

---

## Quick start

Use [degit](https://github.com/Rich-Harris/degit) to quickly scaffold a new project:

```sh
npx degit antonielbordin/sveltekit-static-site my-app
cd my-app && npm install
```

## Deploying to GitHub Pages or static hosting

If you want to use static hosting first, 
build the application by running `npm run build`.

Then just upload the content of your build folder.

Now if you want to host on github pages follow the steps below:

- 1) Enable 

```diff
  kit: {
    + paths: {
    +   base: process.env.NODE_ENV === "production" ? "/sveltekit-static-site" : "",
    + }
  }
```

in the `svelte.config.js` file

- 2) Run the command `npm run deploy-gh-pages`

- 3) After that go to your repository settings and enable the pages in the docs directory now just go up on github.

