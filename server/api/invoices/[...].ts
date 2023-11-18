import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await createInvoice(event);
  })
);

async function createInvoice(event: H3Event) {
  console.log("createInvoice nuxt server");
  const cookies = parseCookies(event);
  const body = await readBody(event);
  console.log("cookies", cookies);
  console.log("body", body);
  console.log("event", event);
  const res: any = await $fetch("http://localhost:8000/api/invoice", {
    method: "POST",
    body,
    headers: {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    },
  });

  return res;
}

export default useBase("/api/invoices", router.handler);
