<template>
  <nav>
    <ul>
      <li class="inline-block rounded">
        <nuxt-link
          class="mr-8 inline-block py-2 font-bold text-white"
          :class="{
            isActive: 'text-underline',
          }"
          to="/dashboard"
          >Dashboard</nuxt-link
        >
      </li>
      <li class="inline-block">
        <nuxt-link
          class="inline-block py-2 pr-8 font-bold text-white"
          to="/contacts"
          >Contacts</nuxt-link
        >
      </li>
      <li class="inline-block">
        <nuxt-link
          class="inline-block py-2 pr-8 font-bold text-white"
          to="/clients"
          >Clients</nuxt-link
        >
      </li>
      <li class="inline-block">
        <nuxt-link
          class="inline-block py-2 pr-8 font-bold text-white"
          to="/invoice"
          >Invoices</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>
