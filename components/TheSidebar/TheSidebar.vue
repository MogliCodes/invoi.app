<template>
  <aside class="fixed top-0 bottom-0 z-20 bg-blue-90 w-2/12">
    <div class="px-6 py-12">
      <div class="sm:mb-6 ml-6">
        <span class="text-md font-extrabold text-white font-syne"
          >invoi.app</span
        >
      </div>
      <nav>
        <ul class="flex items-center sm:block">
          <li
            class="inline-block sm:block"
            :key="index"
            v-for="(item, index) in navItems"
          >
            <BaseMenuItem
              on-dark-bg
              :to="item.to"
              :text="item.text"
              :icon="item.icon"
            />
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
const navItems = [
  {
    icon: "i-heroicons-home",
    to: "/dashboard",
    text: "Dashboard",
  },
  {
    icon: "i-heroicons-user-circle",
    to: "/contacts",
    text: "Contacts",
  },
  {
    icon: "i-heroicons-building-office",
    to: "/clients",
    text: "Clients",
  },
  {
    icon: "i-heroicons-banknotes",
    to: "/invoices",
    text: "Invoices",
  },
  {
    icon: "i-heroicons-document",
    to: "/proposals",
    text: "Proposals",
  },
  {
    icon: "i-heroicons-credit-card",
    to: "/expenses",
    text: "Expenses",
  },
];
</script>
