export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("TEST");
  const res: Promise<object> = await $fetch(
    "http://localhost:8000/api/auth/register",
    {
      method: "POST",
      body,
    }
  );
  return res;
});
