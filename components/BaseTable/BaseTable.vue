<template>
  <table class="table-auto w-full rounded-lg overflow-hidden">
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
