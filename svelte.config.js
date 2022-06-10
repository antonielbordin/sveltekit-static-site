import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },    
    // enable this base url for publish in github pages
    paths: {      
      base: process.env.NODE_ENV === "production" ? "/sveltekit-static-site" : "",
    },    
  },
};

export default config;
