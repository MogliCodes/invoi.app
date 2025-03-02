<template>
    <NuxtLink v-if="to" :to="to"
        class="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-blue-80 transition-colors" :class="[
            isPrimary
                ? 'font-medium text-yellow-600 dark:text-yellow-400 border-l-4 border-yellow-500 pl-3'
                : 'text-gray-700 dark:text-white'
        ]">
        <div class="flex items-center">
            <UIcon v-if="icon" :name="icon" class="mr-3 text-lg" />
            {{ text }}
        </div>
    </NuxtLink>

    <button v-else class="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-blue-80 transition-colors"
        :class="[
            isPrimary
                ? 'font-medium text-yellow-600 dark:text-yellow-400 border-l-4 border-yellow-500 pl-3'
                : 'text-gray-700 dark:text-white'
        ]" @click="$emit('click')" type="button">
        <div class="flex items-center">
            <UIcon v-if="icon" :name="icon" class="mr-3 text-lg" />
            {{ text }}
        </div>
    </button>
</template>

<script setup lang="ts">
defineProps({
    text: {
        type: String,
        required: true
    },
    to: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    isPrimary: {
        type: Boolean,
        default: false
    }
});

defineEmits(['click']);
</script>