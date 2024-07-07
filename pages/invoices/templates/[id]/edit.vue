<template>
  <main class="flex flex-col gap-8">
    <section>
      <div class="mx auto container">
        <div class="flex flex-col items-start gap-4">
          <IconButton
            icon="i-heroicons-arrow-left"
            size="sm"
            @click="$router.back()"
          />
          <BaseHeadline type="h1" text="Edit template" />
        </div>
      </div>
    </section>
    <section>
      <BaseHeadline type="h2" text="Template details" />
      <BaseBox class="mx auto container flex w-1/2 flex-col gap-4">
        <div>
          <label for="">Name</label>
          <BaseInput v-model="data.name" />
        </div>
        <div>
          <label for="">File name</label>
          <BaseInput v-model="data.fileName" />
        </div>
      </BaseBox>
    </section>
    <section>
      <pre>{{ htmlTemplate }}</pre>
      <pre>{{ data }}</pre>
      <pre>{{ pending }}</pre>
    </section>
  </main>
</template>
<script setup lang="ts">
const route = useRoute();
const templateId = route.params.id;

const { data, pending } = await useFetch(
  `/api/invoices/templates/${templateId}/get`,
  {
    method: "POST",
    body: JSON.stringify({ id: templateId }),
  }
);

const htmlTemplate = ref();
console.log("%c data NOT changed", "color: green; font-weight: bold");
watch(data, async () => {
  console.log("%c data changed", "color: red");
  htmlTemplate.value = data.value.htmlTemplate;
  if (data.value.fileName) {
    console.log("REQUEST MADE", data.value.fileName);
    const templateData = await $fetch(
      `http://localhost:8000/restapi/storage/objects/${data.value.fileName}`,
      {
        method: "GET",
      }
    );
    htmlTemplate.value = templateData;
    console.log("htmlTemplateData", templateData);
  }
});
</script>
