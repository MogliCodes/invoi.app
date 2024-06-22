export default defineNuxtRouteMiddleware((to, from) => {
  // get cookie accessToken
  const accessToken = useCookie("accessToken");
});
