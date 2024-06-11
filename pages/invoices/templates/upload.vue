<template>
  <main>
    <section>
      <div class="container mx-auto">
        <BaseHeadline
          class="mb-4 dark:text-white"
          type="h1"
          text="Upload a template"
        />
        <BaseButton
          to="/invoices/templates/upload"
          text="Upload template"
          @click="showOverlay = !showOverlay"
        />
      </div>
    </section>
    <UModal v-model="showOverlay">
      <TemplateUploadForm />
    </UModal>
  </main>
</template>

<script setup lang="ts">
import TemplateUploadForm from "~/components/TemplateUploadForm.vue";

const showOverlay = ref(false);
</script>
