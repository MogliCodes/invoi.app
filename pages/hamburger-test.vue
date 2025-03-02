<template>
    <div class="p-8">
        <h1 class="mb-6 text-2xl font-bold">Hamburger Icon Test</h1>

        <div class="mb-8">
            <h2 class="mb-4 text-xl">Static Examples</h2>
            <div class="flex space-x-8">
                <div>
                    <p class="mb-2">Hamburger State (isOpen: false)</p>
                    <AnimatedHamburgerIcon :is-open="false" @click="() => { }" />
                </div>

                <div>
                    <p class="mb-2">X State (isOpen: true)</p>
                    <AnimatedHamburgerIcon :is-open="true" @click="() => { }" />
                </div>
            </div>
        </div>

        <div>
            <h2 class="mb-4 text-xl">Interactive Example</h2>
            <div class="flex flex-col items-start">
                <p class="mb-2">Current state: {{ isOpen ? 'X (Menu Open)' : 'Hamburger (Menu Closed)' }}</p>
                <AnimatedHamburgerIcon :is-open="isOpen" @click="toggleMenu" />
                <button class="mt-4 rounded bg-blue-500 px-4 py-2 text-white" @click="toggleMenu">
                    Toggle Menu State
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);

function toggleMenu(): void {
    isOpen.value = !isOpen.value;
}
</script>