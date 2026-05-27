<template>
  <div>
    sentence: {{ sentence }}
  </div>
</template>

<script lang="ts" setup>
const { sentence } = useRoute().params
</script>
