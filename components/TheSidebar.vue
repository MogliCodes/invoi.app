<template>
  <aside class="flex flex-row bg-blue-dark p-12 sm:w-1/6 sm:flex-col">
    <div class="sm:mb-12">
      <span class="text-xl font-bold text-white">Invoi.app</span>
    </div>
    <nav>
      <ul class="flex items-center sm:block">
        <li class="inline-block sm:block">
          <nuxt-link
            to="/dashboard"
            class="inline-block p-4 text-white sm:block"
            active-class="bg-yellow-normal text-yellow-dark"
            >Dashboard</nuxt-link
          >
        </li>
        <li class="block">
          <nuxt-link
            to="/contacts"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Contacts</nuxt-link
          >
        </li>
        <li class="block">
          <nuxt-link
            to="/clients"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Clients</nuxt-link
          >
        </li>
        <li class="block">
          <nuxt-link
            to="/invoices"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Invoices</nuxt-link
          >
        </li>

        <li class="block">
          <nuxt-link
            to="/proposals"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Proposals</nuxt-link
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>
