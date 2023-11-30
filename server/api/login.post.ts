export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.backendBaseUrl;
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/api/auth/login`, {
    method: "POST",
    body,
  });

  return res;
});
