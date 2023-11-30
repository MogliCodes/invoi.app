export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res: any = await $fetch("${backendBaseUrl}/api/auth/login", {
    method: "POST",
    body,
  });

  return res;
});
