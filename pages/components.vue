<template>
  <section>
    <div class="container mx-auto">
      <BaseButton variant="yellow" text="Test" />
      <BaseButton variant="outline" text="Test" />
      <BaseButton variant="secondary" text="Test" />
    </div>
  </section>
  <section>
    <div class="container mx-auto">
      <BaseTable>
        <template #head>
          <th class="py-4"><BaseText>1</BaseText></th>
          <th class="py-4"><BaseText>2</BaseText></th>
          <th class="py-4"><BaseText>3</BaseText></th>
          <th class="py-4"><BaseText>4</BaseText></th>
          <th class="py-4"><BaseText>5</BaseText></th>
        </template>
      </BaseTable>
    </div>
  </section>
  <section>
    <div class="container mx-auto">
      <BaseBox>
        <BaseText>
          <BaseHeadline type="h2" text="Headline" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur cupiditate dignissimos dolorum earum in magnam nam nobis
            omnis quis, voluptatem?
          </p>
        </BaseText>
      </BaseBox>
    </div>
  </section>
  <section>
    <div class="container mx-auto flex start gap-2">
      <BaseMenuItem
        size="sm"
        to="/"
        icon="i-heroicons-cog-6-tooth"
        text="Dashboard"
      />
      <BaseMenuItem size="sm" to="/" icon="i-heroicons-cog-6-tooth" />
    </div>
    <div class="bg-blue-90 container mx-auto flex start">
      <BaseMenuItem
        size="sm"
        on-dark-bg
        to="/"
        icon="i-heroicons-cog-6-tooth"
        text="Dashboard"
      />
    </div>
  </section>
  <section>
    <div class="container mx-auto flex start gap-2">
      <BaseMenuItem to="/" icon="i-heroicons-cog-6-tooth" text="Dashboard" />
      <BaseMenuItem to="/" icon="i-heroicons-cog-6-tooth" />
    </div>
    <div class="bg-blue-90 container mx-auto flex start">
      <BaseMenuItem
        on-dark-bg
        to="/"
        icon="i-heroicons-cog-6-tooth"
        text="Dashboard"
      />
    </div>
  </section>
  <section>
    <div class="container mx-auto flex start gap-2">
      <BaseMenuItem
        size="lg"
        to="/"
        icon="i-heroicons-cog-6-tooth"
        text="Dashboard"
      />
      <BaseMenuItem size="lg" to="/" icon="i-heroicons-cog-6-tooth" />
    </div>
    <div class="bg-blue-90 container mx-auto flex start">
      <BaseMenuItem
        size="lg"
        on-dark-bg
        to="/"
        icon="i-heroicons-cog-6-tooth"
        text="Dashboard"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import BaseText from "~/components/BaseText/BaseText.vue";
import BaseTable from "~/components/BaseTable/BaseTable.vue";
</script>
