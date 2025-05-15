<script lang="ts" setup>
interface Properties {
  title: string
}
const props = defineProps<Properties>()
</script>

<template>
  <h2 class="text-center text-white uppercase text-sm p-1">{{ props.title }}</h2>
</template>
