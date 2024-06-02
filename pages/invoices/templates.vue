<template>
  <main>
    <section>
      <div class="container mx-auto">
        <BaseHeadline class="mb-4 dark:text-white" type="h1" text="Templates" />
        <BaseButton to="/invoice/templates/upload" text="Upload template" />
      </div>
    </section>
    <section>
      <div class="container mx-auto">
        <div v-for="template in (actualTemplates as TemplateData)">
          <p>{{ template.name }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
type TemplateData = {
  data: {
    name: string;
  }[];
};
const { data: templates } = await useFetch(
  "http://localhost:8000/restapi/storage/bucket"
);

// @ts-ignore
const actualTemplates = templates?.value.data.filter(
  (template) => template.name.includes(".html") && !template.name.includes("/")
);
</script>
