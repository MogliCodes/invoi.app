<template>
  <div class="w-1/2">
    <div v-if="!settings?.data">
      <p>No settings yet.</p>
      <BaseButton @click="initSettigns" text="Initialize settings" />
    </div>
    <div v-else class="flex flex-col gap-6">
      <section>
        <BaseHeadline
          class="mb-2 text-xl font-bold dark:text-white"
          text="General"
          type="h2"
        />
        <BaseBox>
          <BaseHeadline
            class="mb-2 text-xl font-bold dark:text-white"
            text="User information"
            type="h3"
          />
          <div class="mb-6 flex flex-col gap-3">
            <div>
              <BaseLabel text="Profile Image" />
              <BaseInput
                v-model="profileImage"
                type="file"
                placeholder="Username"
              />
            </div>
            <div>
              <BaseLabel text="Username" />
              <BaseInput v-model="username" placeholder="Username" />
            </div>
            <div>
              <BaseLabel text="E-Mail" />
              <BaseInput v-model="email" placeholder="E-Mail" />
            </div>
            <div>
              <BaseLabel text="Firstname" />
              <BaseInput v-model="firstname" placeholder="Firstname" />
            </div>
            <div>
              <BaseText><label>Lastname</label></BaseText>
              <BaseInput v-model="lastname" placeholder="Lastname" />
            </div>
            <div>
              <BaseLabel text="Street" />
              <BaseInput v-model="street" placeholder="Street" />
            </div>
            <div>
              <BaseLabel text="ZIP" />
              <BaseInput v-model="zip" placeholder="ZIP" />
            </div>
            <div>
              <BaseLabel text="City" />
              <BaseInput v-model="city" placeholder="City" />
            </div>
            <div>
              <BaseLabel text="Phone" />
              <BaseInput v-model="phone" placeholder="Phone" />
            </div>
            <div>
              <BaseLabel text="Tax ID" />
              <BaseInput v-model="taxId" placeholder="Steuernummer" />
            </div>
            <div>
              <BaseLabel text="VAT ID" />
              <BaseInput v-model="vatId" placeholder="Umsatzsteuer-ID" />
            </div>
          </div>
          <BaseButton text="Save settings" @click="updateSettings" />
        </BaseBox>
      </section>
      <section>
        <BaseHeadline
          class="mb-2 text-xl font-bold dark:text-white"
          text="Bank information"
          type="h2"
        />
        <BaseBox class="flex flex-col gap-3">
          <div>
            <BaseLabel text="Bank name" />
            <BaseInput v-model="bankName" placeholder="Bank name" />
          </div>
          <div>
            <BaseLabel text="IBAN" />
            <BaseInput v-model="iban" placeholder="IBAN" />
          </div>
          <div>
            <BaseLabel text="BIC" />
            <BaseInput v-model="bic" placeholder="BIC" />
          </div>
        </BaseBox>
      </section>
      <section>
        <BaseHeadline
          class="text-xl font-bold dark:text-white"
          text="Templates"
          type="h2"
        />
        <BaseBox>
          <div>
            <BaseHeadline
              class="mb-2 font-bold dark:text-white"
              text="Invoices"
              type="h3"
            />
            <div class="flex w-2/3 flex-col gap-3">
              <div>
                <BaseLabel text="Invoice number schema" />
                <BaseInput
                  v-model="invoiceNumberSchema"
                  placeholder="2023-001 (YYYY-XXX)"
                />
              </div>
              <div>
                <BaseLabel text="Additional Text for End of Invoices" />
                <textarea
                  v-model="additionalTextForEndOfInvoices"
                  class="font-inherit w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-1 text-yellow-dark focus:border-2 focus:border-yellow-normal focus:outline-0 dark:border-white dark:border-opacity-20 dark:bg-black dark:bg-opacity-20 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-yellow-300"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <BaseLabel text="Additional Text for Reverse Charge Invoices" />
                <textarea
                  v-model="additionalTextForReverseChargeInvoices"
                  class="font-inherit w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-1 text-yellow-dark focus:border-2 focus:border-yellow-normal focus:outline-0 dark:border-white dark:border-opacity-20 dark:bg-black dark:bg-opacity-20 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-yellow-300"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
        </BaseBox>
      </section>
      <section>
        <BaseHeadline
          type="h2"
          text="Defaults"
          class="text-xl font-bold dark:text-white"
        />
        <BaseBox class="flex flex-col gap-3">
          <!--          <BaseHeadline-->
          <!--            type="h3"-->
          <!--            text="Internalization"-->
          <!--            class="text-xl font-bold dark:text-white"-->
          <!--          />-->
          <!--          <div>-->
          <!--            <BaseLabel text="Currency" />-->
          <!--            <BaseInput v-model="currency" placeholder="Currency" />-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <BaseLabel text="Language" />-->
          <!--            <BaseInput v-model="language" placeholder="Language" />-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <BaseLabel text="Timezone" />-->
          <!--            <BaseInput v-model="timezone" placeholder="Timezone" />-->
          <!--          </div>-->
          <BaseHeadline
            type="h3"
            text="Rates"
            class="text-xl font-bold dark:text-white"
          />
          <div>
            <BaseLabel text="Hourly Rate" />
            <BaseInput v-model="hourlyRate" placeholder="80€" />
          </div>
          <div>
            <BaseLabel text="Daily Rate" />
            <BaseInput v-model="dailyRate" placeholder="640€" />
          </div>
          <div>
            <BaseLabel text="Tax Rate" />
            <BaseInput v-model="taxRate" placeholder="19%" />
          </div>
        </BaseBox>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

definePageMeta({
  title: "Settings",
});

const authStore = useAuthStore();
const alertStore = useAlertStore();
const profileImage = ref();
const username = ref(authStore.userName);
const email = ref("");
const firstname = ref("");
const lastname = ref("");
const street = ref("");
const zip = ref("");
const city = ref("");
const phone = ref("");
const taxId = ref("");
const vatId = ref("");

const bankName = ref("");
const iban = ref("");
const bic = ref("");

const invoiceNumberSchema = ref("");
const additionalTextForEndOfInvoices = ref("");
const additionalTextForReverseChargeInvoices = ref("");

const hourlyRate = ref("");
const dailyRate = ref("");
const taxRate = ref("");

const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: settings, refresh } = useFetch(
  `${backendBaseUrl}/restapi/settings`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

// useFetch post call to update settings
async function updateSettings() {
  const res = await $fetch(`${backendBaseUrl}/restapi/settings`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
    body: {
      username: username.value,
      email: email.value,
      firstname: firstname.value,
      lastname: lastname.value,
      street: street.value,
      zipCode: zip.value,
      city: city.value,
      phone: phone.value,
      taxId: taxId.value,
      vatId: vatId.value,
      bankName: bankName.value,
      iban: iban.value,
      bic: bic.value,
      user: authStore.userId,
      currency: "EUR",
      language: "de",
      invoiceNumberSchema: invoiceNumberSchema.value,
      additionalTextForEndOfInvoices: additionalTextForEndOfInvoices.value,
      additionalTextForReverseChargeInvoices:
        additionalTextForReverseChargeInvoices.value,
      defaultHourlyRate: hourlyRate.value,
      defaultDailyRate: dailyRate.value,
      defaultTaxRate: taxRate.value,
    },
  });
  if (res.status === 201) {
    refresh();
    alertStore.setAlert("success", res.message);
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5e3);
  }
}

// watch settings, if settings changes, initialize all refs
watch(settings, () => {
  username.value = settings.value.data.username;
  email.value = settings.value.data.email;
  firstname.value = settings.value.data.firstname;
  lastname.value = settings.value.data.lastname;
  street.value = settings.value.data.street;
  zip.value = settings.value.data.zipCode;
  city.value = settings.value.data.city;
  phone.value = settings.value.data.phone;
  taxId.value = settings.value.data.taxId;
  vatId.value = settings.value.data.vatId;
  bankName.value = settings.value.data.bankName;
  iban.value = settings.value.data.iban;
  bic.value = settings.value.data.bic;
  invoiceNumberSchema.value = settings.value.data.invoiceNumberSchema;
  additionalTextForEndOfInvoices.value =
    settings.value.data.additionalTextForEndOfInvoices;
  additionalTextForReverseChargeInvoices.value =
    settings.value.data.additionalTextForReverseChargeInvoices;
  hourlyRate.value = settings.value.data.defaultHourlyRate;
  dailyRate.value = settings.value.data.defaultDailyRate;
  taxRate.value = settings.value.data.defaultTaxRate;
});

async function initSettigns() {
  const res = await $fetch(`${backendBaseUrl}/restapi/settings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
    body: {
      username: username?.value || "test",
      email: email?.value || "test",
      firstname: firstname?.value || "test",
      lastname: lastname?.value || "test",
      street: street?.value || "test",
      zipCode: zip?.value || "test",
      city: city?.value || "test",
      phone: phone?.value || "test",
      taxId: taxId?.value || "test",
      vatId: vatId?.value || "test",
      bankName: bankName?.value || "test",
      iban: iban?.value || "test",
      bic: bic?.value || "test",
      user: authStore?.userId || "test",
      currency: "EUR",
      language: "de",
    },
  });
  if (res.status === 201) {
    refresh();
    alertStore.setAlert("success", res.message);
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5e3);
  }
}
</script>
