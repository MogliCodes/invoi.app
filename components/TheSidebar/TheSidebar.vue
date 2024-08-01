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
              class="group inline-block rounded-lg sm:block"
              :class="[
                { 'hover:bg-blue-80': item?.subItems?.length },
                { 'bg-blue-80': isActiveSubmenu(`menu-${index}`) },
              ]"
            >
              <BaseMenuItem
                on-dark-bg
                :to="item.to"
                :text="item.text"
                :icon="item.icon"
              >
                <template v-if="!!item?.subItems?.length" #trailingIcon>
                  <IconButton
                    variant="secondary"
                    size="xs"
                    :icon="
                      isActiveSubmenu(`menu-${index}`)
                        ? 'i-heroicons-chevron-up'
                        : 'i-heroicons-chevron-down'
                    "
                    @click.prevent="toggleSubmenu(`menu-${index}`)"
                  />
                </template>
              </BaseMenuItem>
              <ul
                v-if="!!item?.subItems?.length"
                class="pb-5"
                :class="isActiveSubmenu(`menu-${index}`) ? 'block' : 'hidden'"
              >
                <li v-for="subItem in item.subItems" class="px-5">
                  <BaseMenuItem
                    on-dark-bg
                    :to="subItem.to"
                    :text="subItem.text"
                    :icon="subItem.icon"
                  />
                </li>
              </ul>
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
const subMenu = ref("");

function toggleSubmenu(menu: string) {
  if (subMenu.value === menu) {
    subMenu.value = "";
  } else {
    subMenu.value = menu;
  }
}

function isActiveSubmenu(menu: string) {
  return subMenu.value === menu;
}

const navItems = [
  {
    icon: "i-heroicons-home",
    to: "/dashboard",
    text: "Dashboard",
  },
  {
    icon: "i-heroicons-user-circle",
    to: "/contacts",
    text: "Kontakte",
  },
  {
    icon: "i-heroicons-building-office",
    to: "/clients",
    text: "Kunden",
    subItems: [
      {
        icon: "i-heroicons-book-open",
        to: "/clients/projects",
        text: "Projekte",
      },
    ],
  },
  {
    icon: "i-heroicons-briefcase",
    to: "/services",
    text: "Leistungen",
  },
  {
    icon: "i-heroicons-banknotes",
    to: "/invoices",
    text: "Rechnungen",
    subItems: [
      {
        icon: "i-heroicons-pencil",
        to: "/invoices/drafts",
        text: "Vorlagen",
      },
      {
        icon: "i-heroicons-arrow-up-tray",
        to: "/invoices/import",
        text: "Rechnungen importieren",
      },
      {
        icon: "i-heroicons-tag",
        to: "/invoices/categories",
        text: "Kategorien verwalten",
      },
      {
        icon: "i-heroicons-document",
        to: "/invoices/templates",
        text: "Templates verwalten",
      },
    ],
  },
  {
    icon: "i-heroicons-document-text",
    to: "/proposals",
    text: "Angebote",
  },
  {
    icon: "i-heroicons-chart-bar",
    to: "/revenues",
    text: "Einkünfte",
  },
  {
    icon: "i-heroicons-credit-card",
    to: "/expenses",
    text: "Ausgabe",
  },
  {
    icon: "i-heroicons-clock",
    to: "/time-recording",
    text: "Zeiterfassung",
  },
];

const config = useRuntimeConfig();
const currentVersion = config.public.clientVersion;
</script>
