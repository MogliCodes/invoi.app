export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  console.log("backendBaseUrl", config);
  console.log("backendBaseUrl", backendBaseUrl);
  console.log("url", `${backendBaseUrl}/restapi/auth/login`);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/auth/login`, {
    method: "POST",
    body,
  });

  return res;
});
