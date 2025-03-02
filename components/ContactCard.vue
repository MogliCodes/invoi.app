<template>
    <div class="bg-white p-4 rounded-lg shadow-md mb-4 dark:bg-blue-80">
        <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-2">
                <UCheckbox :checked="isSelected" @click="$emit('toggle-selection')" />
                <h3 class="font-semibold text-lg">
                    {{ contact.firstname }} {{ contact.lastname }}
                </h3>
            </div>
            <div class="flex gap-2">
                <NuxtLink :to="`/contacts/${contact._id}`">
                    <UIcon class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                        name="i-heroicons-eye" />
                </NuxtLink>
                <UIcon class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                    name="i-heroicons-trash" @click="$emit('delete', contact._id)" />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
                <p class="text-gray-500 dark:text-gray-400">Geburtsdatum</p>
                <p>{{ formatDate(contact.dob) }}</p>
            </div>
            <div>
                <p class="text-gray-500 dark:text-gray-400">Adresse</p>
                <p>{{ contact.street }}</p>
                <p>{{ contact.zip }} {{ contact.city }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    contact: {
        type: Object,
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
    }
});

defineEmits(['toggle-selection', 'delete']);

function formatDate(dateString) {
    return new Date(dateString)
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .split("/")
        .join(".");
}
</script>