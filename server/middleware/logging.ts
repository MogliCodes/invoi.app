import consola from "consola";
export default defineEventHandler((event) => {
  const method = getMethod(event);
  const url = getRequestURL(event);
  consola.info(`${method} ${url}`);
});
