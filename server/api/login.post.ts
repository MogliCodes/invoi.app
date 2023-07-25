export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res: Promise<object> = await $fetch(
    "http://localhost:8000/api/auth/login",
    {
      method: "POST",
      body,
    }
  );
  console.log("res", res);
  return { message: "HELLO" };
});
