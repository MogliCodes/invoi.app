<template>
    <div class="bg-white p-5 rounded-lg shadow-md mb-5 dark:bg-blue-80">
        <div class="flex justify-between items-start mb-4">
            <div class="flex items-start gap-3">
                <UCheckbox :checked="isSelected" @click="$emit('toggle-selection')" class="mt-1" />
                <div>
                    <h3 class="font-semibold text-lg mb-1">{{ invoice.nr }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ invoice.title }}</p>
                </div>
            </div>
            <div class="flex gap-3 ml-2">
                <NuxtLink :to="`/invoices/${invoice._id}`">
                    <UIcon class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                        name="i-heroicons-eye" />
                </NuxtLink>
                <UIcon class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                    name="i-heroicons-trash" @click="$emit('delete', invoice._id)" />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-5 text-sm mb-4">
            <div>
                <p class="text-gray-500 dark:text-gray-400 mb-1">Kunde</p>
                <p class="font-medium line-clamp-2">{{ clientName || 'Kein Kunde' }}</p>
            </div>
            <div>
                <p class="text-gray-500 dark:text-gray-400 mb-1">Datum</p>
                <p class="font-medium">{{ formatDate(invoice.date) }}</p>
            </div>
        </div>

        <div class="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-blue-70">
            <InvoiceStatusPill :invoice="invoice" />

            <div class="text-right">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Brutto</p>
                <p class="font-semibold text-base">{{ formatCurrencyAmount(formatCentToAmount(invoice.totalWithTaxes))
                    }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    invoice: {
        type: Object,
        required: true
    },
    clientName: {
        type: String,
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

function formatCentToAmount(cents) {
    if (!cents) return 0;
    return cents / 100;
}

function formatCurrencyAmount(amount) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}
</script>