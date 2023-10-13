<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-4" type="h1" text="My invoices" />
    <BaseButtonGroup>
      <BaseButton
        variant="yellow"
        to="/invoices/create"
        text="Create new invoice"
      />
      <BaseButton
        variant="outline"
        to="/invoices/import"
        text="Import invoices"
      />
    </BaseButtonGroup>
  </div>
</template>
