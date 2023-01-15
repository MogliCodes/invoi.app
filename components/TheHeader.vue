<template>
  <header class="bg-gray-900 py-2 mb-8">
    <div class="container mx-auto flex justify-between">
      <TheNavigation />
      <button v-if="!user" @click="login('google', )" class="text-white border rounded px-4 py-2">Login</button>
      <button v-else @click="client.auth.signOut()" class="text-white border rounded px-4 py-2">Logout</button>
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
