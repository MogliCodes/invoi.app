<template>
  <main class="ml-auto lg:w-4/5">
    <StickyElement
      v-if="useRoute().meta.title"
      class="mb-3"
      visible-on-direction="disabled"
    >
      <BaseHeadline
        class="py-4 pl-4 first-letter:uppercase dark:text-white"
        type="h1"
        :text="useRoute().meta.title"
      />
    </StickyElement>
    <BaseContainer class="pt-0 lg:min-h-screen lg:p-4">
      <slot />
    </BaseContainer>
  </main>
</template>
<script setup lang="ts">
import StickyElement from "vue-sticky-element";
</script>
