<template>
  <div class="container mx-auto">
    <h1 class="text-4xl">Login</h1>
    <div class="mb-6">
      <label class="block" for="username">Username</label>
      <input
        v-model="username"
        class="block shadow-lg p-4 bg-slate-100"
        type="text"
      />
    </div>
    <div>
      <label class="block" for="password">Password</label>
      <input
        v-model="password"
        class="block shadow-lg p-4 bg-slate-100"
        type="password"
      />
    </div>
    <button @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
const username = ref(null);
const password = ref(null);

async function login() {
  try {
    const { data } = await useFetch("/api/login", {
      method: "POST",
      body: {
        username: username,
        password: password,
      },
    });
    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  }
}
</script>
