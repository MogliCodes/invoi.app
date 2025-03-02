<template>
  <header class="relative w-full bg-blue-100 py-4 text-white lg:fixed lg:block lg:h-full lg:w-1/5 lg:pt-8 xl:p-4">
    <div class="flex w-full flex-col justify-between lg:block xl:inset-y-4">
      <div class="lg:min-h-screen">
        <div class="flex items-center justify-between lg:block lg:justify-start">
          <h1 class="pl-4 font-syne font-extrabold">invoi.app</h1>
          <div class="pr-4 lg:invisible lg:absolute lg:hidden">
            <AnimatedHamburgerIcon :is-open="showMenu" @click="toggleMenu" />
          </div>
        </div>
        <div :class="{ 'hidden': !showMenu && !isDesktop }" class="lg:block">
          <TheNavigation @navigation-clicked="handleNavClick" />
        </div>
        <div></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const showMenu = ref(false);
const isDesktop = ref(false);

// Check if we're on desktop and set menu visibility accordingly
function checkScreenSize() {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 1024; // 1024px is the lg breakpoint in Tailwind
    showMenu.value = isDesktop.value; // Set menu visibility based on screen size
  }
}

// Initialize on component mount
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// Clean up event listener
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', checkScreenSize);
  }
});

function toggleMenu(): void {
  showMenu.value = !showMenu.value;
}

function handleNavClick(): void {
  // Only hide menu on mobile
  if (!isDesktop.value) {
    showMenu.value = false;
  }
}
</script>
