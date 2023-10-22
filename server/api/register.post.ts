export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await $fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    body,
  });
});
