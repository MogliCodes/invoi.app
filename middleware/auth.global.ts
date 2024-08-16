import jwt from "jsonwebtoken";

export default defineNuxtRouteMiddleware((to, from) => {
  // Get cookie accessToken
  const accessToken = useCookie("accessToken").value;
  const jwtSecret = "your-secret-key"; // Replace with your actual secret key

  console.log("TO PATH", to.path);
  if (to.path === "/") {
    return;
  }

  // Check if accessToken exists
  if (!accessToken) {
    console.log("No access token found");
    // Redirect to login page if not logged in and not already on login page
    if (to.path !== "/login") {
      return navigateTo("/login");
    }
  } else {
    // Verify and decode the token
    try {
      const decodedToken = jwt.verify(accessToken, jwtSecret) as jwt.JwtPayload;

      // Check if the token is expired
      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        console.log("Access token expired");
        if (to.path !== "/login") {
          return navigateTo("/login");
        }
      }
    } catch (error) {
      console.log("Invalid access token");
      if (to.path !== "/login") {
        return navigateTo("/login");
      }
    }
  }
});
