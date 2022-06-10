import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    paths: {
      base: process.env.NODE_ENV === "production" ? "/url-site" : "",
    },
  },
};

export default config;
