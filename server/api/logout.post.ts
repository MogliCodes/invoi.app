export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const body = await readBody(event);
  try {
    return await $fetch(`${backendBaseUrl}/restapi/auth/logout`, {
      method: "POST",
      body,
    });
  } catch (error) {
    return error;
  }
});
