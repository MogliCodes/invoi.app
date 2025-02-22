<template>
  <header
    class="relative w-full bg-blue-100 py-4 text-white lg:fixed lg:block lg:h-full lg:w-1/5 lg:pt-8 xl:p-4"
  >
    <div class="flex w-full flex-col justify-between lg:block xl:inset-y-4">
      <div class="lg:min-h-screen">
        <div
          class="flex items-center justify-between lg:block lg:justify-start"
        >
          <h1 class="pl-4 font-syne font-extrabold">invoi.app</h1>
          <div class="pr-4 lg:invisible lg:absolute lg:hidden">
            <IconButton
              size="sm"
              icon="i-heroicons:bars-3"
              @click="toggleMenu"
            />
          </div>
        </div>
        <TheNavigation v-show="showMenu" />
        <div></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const showMenu = ref(true);

function toggleMenu(): void {
  showMenu.value = !showMenu.value;
}
</script>
