<template>
    <div>

    </div>
</template>

<script setup lang="ts">

const BACKEND_BASE_URL = 'http://localhost:8000'

const clients = ref(null)

useFetch(`${BACKEND_BASE_URL}/api/user`)

</script>