<template>
    <button
        class="relative flex h-8 w-8 flex-col items-center justify-center rounded-lg border-2 border-yellow-normal bg-yellow-normal text-yellow-dark transition-colors hover:bg-yellow-400"
        @click="$emit('click')" :aria-expanded="isOpen" aria-label="Toggle menu">
        <!-- Top line -->
        <span
            class="absolute block h-0.5 w-5 transform rounded-full bg-yellow-dark transition-all duration-300 ease-in-out"
            :style="{ top: isOpen ? 'calc(50% - 1px)' : 'calc(50% - 6px)' }" :class="isOpen ? 'rotate-45' : ''"></span>

        <!-- Middle line -->
        <span class="absolute block h-0.5 w-5 rounded-full bg-yellow-dark transition-all duration-300 ease-in-out"
            :style="{ top: 'calc(50% - 1px)' }" :class="isOpen ? 'opacity-0' : 'opacity-100'"></span>

        <!-- Bottom line -->
        <span
            class="absolute block h-0.5 w-5 transform rounded-full bg-yellow-dark transition-all duration-300 ease-in-out"
            :style="{ top: isOpen ? 'calc(50% - 1px)' : 'calc(50% + 4px)' }" :class="isOpen ? '-rotate-45' : ''"></span>
    </button>
</template>

<script setup lang="ts">
defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
});

defineEmits(['click']);
</script>