export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.backendBaseUrl;
  const body = await readBody(event);
  return await $fetch(`${backendBaseUrl}/api/auth/register`, {
    method: "POST",
    body,
  });
});
