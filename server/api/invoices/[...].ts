import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await createInvoice(event);
  })
);

async function createInvoice(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.backendBaseUrl;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/api/invoice`, {
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
