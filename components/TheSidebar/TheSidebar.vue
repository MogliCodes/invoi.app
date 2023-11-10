<template>
  <aside class="flex flex-row bg-blue-dark-100 px-6 py-12 sm:w-1/6 sm:flex-col">
    <div class="sm:mb-12 ml-6">
      <span class="text-md font-extrabold text-white font-syne">invoi.app</span>
    </div>
    <nav>
      <ul class="flex items-center sm:block">
        <li
          class="inline-block sm:block"
          :key="index"
          v-for="(item, index) in navItems"
        >
          <NuxtLink
            class="transition-all hover:bg-blue-80 inline-block rounded-lg border-2 border-blue-90 px-6 py-4 font-medium text-white focus:border-2 focus:border-yellow-normal focus:outline-0 sm:block"
            active-class="bg-yellow-normal text-yellow-dark focus:border-yellow-100 hover:!bg-yellow-110"
            :to="item.to"
            >{{ item.text }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const navItems = [
  {
    to: "/dashboard",
    text: "Dashboard",
  },
  {
    to: "/contacts",
    text: "Contacts",
  },
  {
    to: "/clients",
    text: "Clients",
  },
  {
    to: "/invoices",
    text: "Invoices",
  },
  {
    to: "/proposals",
    text: "Proposals",
  },
];
</script>
