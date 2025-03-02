<template>
    <div>
        <!-- Desktop View -->
        <div class="hidden md:block max-w-full overflow-x-auto rounded-lg shadow-lg">
            <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
                <thead class="bg-blue-90 text-white">
                    <tr>
                        <th class="py-5 pl-6 text-left">
                            <UCheckbox :checked="selectAll" data-testid="toggleAllContacts"
                                @click="$emit('toggle-select-all')" />
                        </th>
                        <th class="px-6 py-5 text-left">Vorname</th>
                        <th class="px-6 py-5 text-left">Nachname</th>
                        <th class="px-6 py-5 text-left">Geburtsdatum</th>
                        <th class="px-6 py-5 text-left">Straße</th>
                        <th class="px-6 py-5 text-left">PLZ</th>
                        <th class="px-6 py-5 text-left">Stadt</th>
                        <th class="px-6 py-5 text-left">Kategorien</th>
                        <th class="px-6 py-5 text-left">Handlung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contact in contacts" :key="contact._id"
                        class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90">
                        <td class="py-3 pl-6">
                            <UCheckbox :checked="isSelectedContact(contact._id)"
                                @click="$emit('toggle-selection', contact._id)" />
                        </td>
                        <td class="truncate px-6 py-3">{{ contact.firstname }}</td>
                        <td class="px-6 py-3">{{ contact.lastname }}</td>
                        <td class="px-6 py-3">
                            {{ formatDate(contact.dob) }}
                        </td>
                        <td class="line-clamp-1 px-6 py-3">
                            <span class="truncate">{{ contact.street }}</span>
                        </td>
                        <td class="px-6 py-3">{{ contact.zip }}</td>
                        <td class="px-6 py-3">{{ contact.city }}</td>
                        <td class="px-6 py-3"></td>
                        <td class="px-6 py-3">
                            <span class="flex gap-2">
                                <NuxtLink :to="`/contacts/${contact._id}`">
                                    <UIcon
                                        class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                                        name="i-heroicons-eye" />
                                </NuxtLink>
                                <UIcon
                                    class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                                    name="i-heroicons-trash" @click="$emit('delete', contact._id)" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Mobile View -->
        <div class="md:hidden">
            <ContactCard v-for="contact in contacts" :key="contact._id" :contact="contact"
                :is-selected="isSelectedContact(contact._id)" @toggle-selection="$emit('toggle-selection', contact._id)"
                @delete="$emit('delete', $event)" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    contacts: {
        type: Array,
        required: true
    },
    selectedContacts: {
        type: Array,
        required: true
    },
    selectAll: {
        type: Boolean,
        default: false
    }
});

defineEmits(['toggle-selection', 'toggle-select-all', 'delete']);

function isSelectedContact(contactId) {
    return props.selectedContacts.includes(contactId);
}

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