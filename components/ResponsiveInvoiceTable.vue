<template>
    <div>
        <!-- Desktop View -->
        <div class="hidden md:block max-w-full overflow-x-auto rounded-lg shadow-lg">
            <table class="min-w-full overflow-hidden rounded-lg dark:text-gray-400">
                <thead class="bg-blue-90 text-white">
                    <tr>
                        <th class="py-5 pl-6 text-left">
                            <UCheckbox :checked="selectAll" data-testid="toggleAllInvoices"
                                @click="$emit('toggle-select-all')" />
                        </th>
                        <th class="px-6 py-5 text-left">Rechnungsnummer</th>
                        <th class="px-6 py-5 text-left">Titel</th>
                        <th class="px-6 py-5 text-left">Kunde</th>
                        <th class="px-6 py-5 text-left">Datum</th>
                        <th class="px-6 py-5 text-left">Status</th>
                        <th class="px-6 py-5 text-right">Netto</th>
                        <th class="px-6 py-5 text-right">Mwst.</th>
                        <th class="px-6 py-5 text-right">Brutto</th>
                        <th class="px-6 py-5 text-right">Aktion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice in invoices" :key="invoice._id"
                        class="rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90">
                        <td class="py-3 pl-6">
                            <UCheckbox :checked="isSelectedInvoice(invoice._id)"
                                @click="$emit('toggle-selection', invoice._id)" />
                        </td>
                        <td class="px-6 py-3">
                            {{ invoice?.nr }}
                        </td>
                        <td class="px-6 py-3">
                            <span :title="invoice.title">{{ invoice.title }}</span>
                        </td>
                        <td class="px-6 py-3">
                            <span :title="getClientName(invoice.client)">
                                {{ getClientName(invoice.client) }}
                            </span>
                        </td>
                        <td class="px-6 py-3">
                            {{ formatDate(invoice.date) }}
                        </td>
                        <td class="px-6 py-3">
                            <InvoiceStatusPill :invoice="invoice" />
                        </td>
                        <td class="whitespace-nowrap px-6 py-3 text-right">
                            {{ formatCurrencyAmount(formatCentToAmount(invoice.total)) }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-3 text-right">
                            {{ formatCurrencyAmount(formatCentToAmount(invoice?.taxes)) }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-3 text-right">
                            {{ formatCurrencyAmount(formatCentToAmount(invoice?.totalWithTaxes)) }}
                        </td>
                        <td class="px-6 py-3">
                            <span class="flex justify-end gap-2">
                                <NuxtLink :to="`/invoices/${invoice._id}`">
                                    <UIcon
                                        class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                                        name="i-heroicons-eye" />
                                </NuxtLink>
                                <UIcon
                                    class="cursor-pointer text-xl transition-colors hover:text-gray-400 dark:hover:text-white"
                                    name="i-heroicons-trash" @click="$emit('delete', invoice._id)" />
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="bg-blue-90 font-bold text-white">
                        <td></td>
                        <td colspan="5" class="px-6 py-5 font-bold">Summe</td>
                        <td class="whitespace-nowrap px-6 py-3 text-right">
                            {{ formatCurrencyAmount(formatCentToAmount(totalAcc)) }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-3 text-right">
                            {{ formatCurrencyAmount(formatCentToAmount(taxesAcc)) }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-3 text-right">
                            {{ formatCurrencyAmount(formatCentToAmount(totalWithTaxesAcc)) }}
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Mobile View -->
        <div class="md:hidden">
            <InvoiceCard v-for="invoice in invoices" :key="invoice._id" :invoice="invoice"
                :is-selected="isSelectedInvoice(invoice._id)" :client-name="getClientName(invoice.client)"
                @toggle-selection="$emit('toggle-selection', invoice._id)" @delete="$emit('delete', $event)" />

            <!-- Mobile Summary Card -->
            <div class="bg-blue-90 text-white p-5 rounded-lg shadow-md mb-5">
                <h3 class="font-bold text-lg mb-3">Summe</h3>
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-blue-80/50 p-3 rounded-lg">
                        <p class="text-xs text-gray-300 mb-1">Netto</p>
                        <p class="font-semibold text-base">{{ formatCurrencyAmount(formatCentToAmount(totalAcc)) }}</p>
                    </div>
                    <div class="bg-blue-80/50 p-3 rounded-lg">
                        <p class="text-xs text-gray-300 mb-1">Mwst.</p>
                        <p class="font-semibold text-base">{{ formatCurrencyAmount(formatCentToAmount(taxesAcc)) }}</p>
                    </div>
                    <div class="bg-blue-80/50 p-3 rounded-lg">
                        <p class="text-xs text-gray-300 mb-1">Brutto</p>
                        <p class="font-semibold text-base">{{
                            formatCurrencyAmount(formatCentToAmount(totalWithTaxesAcc)) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    invoices: {
        type: Array,
        required: true
    },
    selectedInvoices: {
        type: Array,
        required: true
    },
    selectAll: {
        type: Boolean,
        default: false
    },
    clients: {
        type: Array,
        required: true
    },
    totalAcc: {
        type: Number,
        required: true
    },
    taxesAcc: {
        type: Number,
        required: true
    },
    totalWithTaxesAcc: {
        type: Number,
        required: true
    }
});

defineEmits(['toggle-selection', 'toggle-select-all', 'delete']);

function isSelectedInvoice(invoiceId) {
    return props.selectedInvoices.includes(invoiceId);
}

function getClientName(clientId) {
    const client = props.clients.find(client => client._id === clientId);
    return client?.company || 'Unknown Client';
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