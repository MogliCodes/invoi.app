export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await $fetch("${backendBaseUrl}/api/auth/register", {
    method: "POST",
    body,
  });
});
