<template>
  <div>
    <h1 class="text-4xl">Login</h1>
    <button @click="login('google', )">Login with GitHub</button>
  </div>
</template>

<script setup lang="ts">
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
</script>
