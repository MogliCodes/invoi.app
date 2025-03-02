<template>
    <div class="flex justify-center items-center gap-4 py-2">
        <UButton icon="i-heroicons-arrow-small-left-20-solid" color="yellow" class="rtl:[&_span:first-child]:rotate-180"
            :disabled="currentPage <= 1" @click="$emit('update:page', currentPage - 1)" />

        <span class="text-sm">
            {{ currentPage }} / {{ totalPages }}
        </span>

        <UButton icon="i-heroicons-arrow-small-right-20-solid" color="yellow" class="rtl:[&_span:last-child]:rotate-180"
            :disabled="currentPage >= totalPages" @click="$emit('update:page', currentPage + 1)" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    pageSize: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    }
});

defineEmits(['update:page']);

const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.pageSize);
});
</script>