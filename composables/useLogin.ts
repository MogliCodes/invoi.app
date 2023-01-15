export const useLogin = () => {
  const user = useSupabaseUser();
  const client = useSupabaseAuthClient();
  const router = useRouter();
  // Login method using providers
  async function login(provider: "github" | "google" | "gitlab" | "bitbucket") {
    const { error } = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "/dashboard",
      },
    });
    if (error) {
      return alert("Something went wrong !");
    }
    router.push("/dashboard");
  }
};
