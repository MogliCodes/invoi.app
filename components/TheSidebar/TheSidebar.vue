<template>
  <aside class="fixed inset-y-0 z-20 w-2/12 bg-blue-90">
    <div class="flex h-full flex-col justify-between px-6 py-12">
      <div>
        <div class="ml-6 sm:mb-6">
          <span class="text-md font-syne font-extrabold text-white"
            >invoi.app</span
          >
        </div>
        <nav>
          <ul class="flex items-center sm:block">
            <li
              v-for="(item, index) in navItems"
              :key="index"
              class="inline-block sm:block"
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
      <div class="ml-6">
        <span class="text-sm text-slate-500">v{{ currentVersion }}</span>
      </div>
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
    icon: "i-heroicons-document-text",
    to: "/proposals",
    text: "Proposals",
  },
  {
    icon: "i-heroicons-chart-bar",
    to: "/revenues",
    text: "Revenues",
  },
  {
    icon: "i-heroicons-credit-card",
    to: "/expenses",
    text: "Expenses",
  },
  {
    icon: "i-heroicons-clock",
    to: "/time-recording",
    text: "Time recording",
  },
];

const config = useRuntimeConfig();
const currentVersion = config.public.clientVersion;
</script>
