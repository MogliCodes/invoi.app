<template>
  <div class="md:flex">
    <header
      class="bg-blue-100 text-white flex-1 px-4 py-4 md:pt-8 md:basis-1/5 flex flex-col items-between"
    >
      <div
        class="md:fixed top-4 bottom-4 flex flex-col justify-between bg-blue-100"
      >
        <div class="flex justify-between items-center">
          <h1 class="font-syne font-bold">invoi.app</h1>
          <div class="hidden">
            <IconButton size="sm" icon="i-heroicons:bars-3" />
          </div>
        </div>
        <nav>
          <ul>
            <li v-for="item in men">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
          </ul>
        </nav>
        <div></div>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
const menuItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Contact",
    to: "/contact",
  },
];
</script>
