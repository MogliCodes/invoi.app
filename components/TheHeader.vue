<template>
  <header class="bg-gray-900 py-2 mb-8">
    <div class="container mx-auto flex justify-between">
      <TheNavigation />
      <NuxtLink
        to="/login"
        class="border border-white rounded p-2 px-4 text-white"
        >Login</NuxtLink
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import TheNavigation from "~/components/TheNavigation.vue";

const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();
// Login method using providers
async function login(provider: "google") {
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
