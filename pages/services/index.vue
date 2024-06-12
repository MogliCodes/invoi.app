<template>
  <section>
    <div class="flex items-center gap-3">
      <BaseButton
        to="/services/create"
        text="Create services"
        variant="yellow"
      />
      <BaseButton
        to="/services/import"
        text="Import services"
        variant="outline"
      />
    </div>
  </section>
  <section class="flex">
    <BaseBox class="text-center">
      <BaseHeadline text="No services available" type="h2"></BaseHeadline>
      <p>
        There are currently no services available. <br />
        Go ahead and create your first service!
      </p>
      <BaseButton
        to="/services/create"
        text="Create service"
        variant="yellow"
      />
    </BaseBox>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Services",
});
</script>
