<template>
    <div class="relative w-full">
        <button
            class="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-blue-90 rounded-lg shadow-md border-l-4 border border-gray-200 dark:border-blue-80 text-gray-800 dark:text-white font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-blue-80"
            :class="isOpen ? 'border-l-yellow-500' : 'border-l-gray-300 dark:border-l-blue-70'" @click="toggleMenu"
            type="button">
            <div class="flex items-center">
                <UIcon name="i-heroicons-bars-3" class="mr-2 text-lg" />
                <span>{{ mainButtonText }}</span>
            </div>
            <UIcon name="i-heroicons-chevron-down" class="transition-transform duration-200"
                :class="{ 'rotate-180': isOpen }" />
        </button>

        <transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="isOpen"
                class="absolute z-50 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-blue-90 border border-gray-200 dark:border-blue-80">
                <div class="py-1">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    mainButtonText: {
        type: String,
        required: true
    }
});

const isOpen = ref(false);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

// Close menu when clicking outside
function handleClickOutside(event) {
    const element = event.target;
    if (isOpen.value && !element.closest('.relative')) {
        isOpen.value = false;
    }
}

// Add and remove event listener
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>