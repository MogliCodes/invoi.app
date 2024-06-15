export default defineNuxtRouteMiddleware((to, from) => {
  // get cookie accessToken
  const accessToken = useCookie("accessToken");
  console.log("accessToken", accessToken.value);
  console.log("from", from);
});
