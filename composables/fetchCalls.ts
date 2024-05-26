// const config = useRuntimeConfig();
// const authStore = useAuthStore();
// type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

// async function useFetchWrapper(
//   endpoint: string,
//   method: HttpMethod = "GET",
//   payload
// ) {
//   const url = `${config.BASE_URL}/${endpoint}`;
//   const headers = {
//     Authorization: `Bearer ${authStore.accessToken}`,
//     ClientId: authStore.userId,
//   };
//   try {
//     // TODO: Handle response
//     return await useFetch(url, {
//       method,
//       body: payload || null,
//       headers,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
