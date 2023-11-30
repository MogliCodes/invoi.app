<template>
  <table class="w-full table-auto overflow-hidden rounded-lg">
    <thead class="bg-blue-80">
      <tr>
        <slot name="head"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>
