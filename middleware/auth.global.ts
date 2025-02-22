export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicPaths = ["/", "/login", "/register", "/redesign"];

  if (publicPaths.includes(to.path)) {
    return;
  }
  const headers = useRequestHeaders(["cookie"]);

  try {
    const response = await $fetch("/api/validateToken", {
      credentials: "same-origin", // Ensure cookies are sent with the request
      headers,
    });
    console.log("Token validation response", response);
    if (!response.valid) {
      console.log("Invalid or expired token");
      return navigateTo("/login");
    }
  } catch (error) {
    console.log("Error validating token", error);
    return navigateTo("/login");
  }
});
