<template>
  <header class="py-8">
    <div class="container mx-auto flex justify-between">
      <NuxtLink
        to="/"
        class="text-md font-extrabold text-blue-90 dark:text-white font-syne"
        >invoi.app</NuxtLink
      >
      <ColorModeButton />
    </div>
  </header>
  <main
    class="h-full items-center justify-center bg-blue-50 dark:bg-blue-90 text-white"
  >
    <slot />
  </main>
</template>
