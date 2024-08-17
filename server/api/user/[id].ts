// invoi-nuxt/server/api/user/[id].ts
import { H3Event } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const userId = getRouterParams(event).id;
  const accessToken = getCookie(event, "accessToken");

  if (!accessToken) {
    return { error: "No access token provided" };
  }

  try {
    const response = await $fetch(
      `${config.public.BACKEND_BASE_URL}/restapi/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          userid: userId,
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Failed to fetch user data" };
  }
});
