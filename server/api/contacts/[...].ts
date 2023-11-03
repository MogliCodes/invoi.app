import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await createContact(event);
  })
);

async function createContact(event: H3Event) {
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch("http://localhost:8000/api/contact", {
    method: "POST",
    body,
    headers: {
      authorization: cookies.accessToken,
    },
  });

  return res;
}

export default useBase("/api/contacts", router.handler);
