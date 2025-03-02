<template>
  <nav
    class="absolute inset-x-0 bottom-0 z-40 translate-y-full border-t-2 bg-blue-100 p-4 lg:static lg:translate-y-0 lg:border-t-0">
    <ul class="flex flex-col gap-3">
      <li v-for="(item, index) in visibleMenuItems" :key="index" class="group inline-block rounded-lg sm:block" :class="[
        { 'hover:bg-blue-80': item?.subItems?.length },
        { 'bg-blue-80': isActiveSubmenu(`menu-${index}`) },
      ]">
        <BaseMenuItem on-dark-bg :to="item.to" :text="item.text" :icon="item.icon" @click="emitNavClick">
          <template v-if="!!item?.subItems?.length" #trailingIcon>
            <div @click.stop.prevent="toggleSubmenuOnly(`menu-${index}`)">
              <IconButton variant="secondary" size="xs" :icon="isActiveSubmenu(`menu-${index}`)
                ? 'i-heroicons-chevron-up'
                : 'i-heroicons-chevron-down'" />
            </div>
          </template>
        </BaseMenuItem>
        <ul v-if="!!item?.subItems?.length" class="pb-5" :class="isActiveSubmenu(`menu-${index}`) ? 'block' : 'hidden'">
          <li v-for="subItem in item.subItems" class="px-5">
            <BaseMenuItem on-dark-bg :to="subItem.to" :text="subItem.text" :icon="subItem.icon" @click="emitNavClick" />
          </li>
        </ul>
      </li>
      <!-- Settings option visible only on mobile -->
      <li class="group inline-block rounded-lg sm:block lg:hidden">
        <BaseMenuItem on-dark-bg to="/settings" text="Einstellungen" icon="i-heroicons-cog-6-tooth"
          @click="emitNavClick" />
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
const emit = defineEmits(['navigation-clicked']);
const config = useRuntimeConfig();

function emitNavClick() {
  // Close any open submenus when navigating
  closeAllSubmenus();
  emit('navigation-clicked');
}

// Toggle submenu without closing the navigation
function toggleSubmenuOnly(menu: string) {
  if (subMenu.value === menu) {
    subMenu.value = "";
  } else {
    subMenu.value = menu;
  }
}

// Close all open submenus
function closeAllSubmenus() {
  subMenu.value = "";
}

// Expose the closeAllSubmenus method to parent components
defineExpose({
  closeAllSubmenus
});

// Original toggle function (kept for compatibility)
function toggleSubmenu(menu: string) {
  toggleSubmenuOnly(menu);
}

// Core menu items that are always visible
const coreMenuItems = [
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
];

// Feature-toggled menu items
const featureMenuItems = [
  {
    icon: "i-heroicons-briefcase",
    to: "/services",
    text: "Leistungen",
    feature: "FEATURE_SERVICES",
  },
  {
    icon: "i-heroicons-document-text",
    to: "/proposals",
    text: "Angebote",
    feature: "FEATURE_PROPOSALS",
  },
  {
    icon: "i-heroicons-chart-bar",
    to: "/revenues",
    text: "Einkünfte",
    feature: "FEATURE_REVENUES",
  },
  {
    icon: "i-heroicons-credit-card",
    to: "/expenses",
    text: "Ausgabe",
    feature: "FEATURE_EXPENSES",
  },
  {
    icon: "i-heroicons-clock",
    to: "/time-recording",
    text: "Zeiterfassung",
    feature: "FEATURE_TIME_RECORDING",
  },
];

// Compute visible menu items based on feature toggles
const visibleMenuItems = computed(() => {
  const enabledFeatureItems = featureMenuItems.filter(item => {
    return config.public[item.feature] === true;
  }).map(item => {
    // Remove the feature property before returning the item
    const { feature, ...menuItem } = item;
    return menuItem;
  });

  return [...coreMenuItems, ...enabledFeatureItems];
});

const subMenu = ref("");

function isActiveSubmenu(menu: string) {
  return subMenu.value === menu;
}
</script>
