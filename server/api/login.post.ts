export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res: any = await $fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    body,
  });

  return res.token;
});
