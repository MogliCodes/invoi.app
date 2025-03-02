<template>
    <div class="p-8">
        <h2 class="mb-4 text-xl font-bold">Hamburger Icon Test</h2>

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
</template>

<script setup lang="ts">
// Test component to verify hamburger icon states
</script>