import * as d3 from "d3";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  nuxtApp.vueApp.use(d3);
  console.log("D3 plugin has been loaded");
});
