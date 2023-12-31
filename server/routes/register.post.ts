export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const body = await readBody(event);
  return await $fetch(`${backendBaseUrl}/api/auth/register`, {
    method: "POST",
    body,
  });
});
