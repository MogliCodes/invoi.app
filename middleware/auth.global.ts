export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicPaths = ["/", "/login", "/register"];

  if (publicPaths.includes(to.path)) {
    return;
  }

  try {
    const response = await $fetch("/api/validateToken");

    if (!response.valid) {
      console.log("Invalid or expired token");
      return navigateTo("/login");
    }
  } catch (error) {
    console.log("Error validating token", error);
    return navigateTo("/login");
  }
});
