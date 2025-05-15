<script lang="ts" setup>
import CssIcon from './cssIcon.vue'
import HtmlIcon from './htmlIcon.vue'
import JsIcon from './jsIcon.vue'

interface Properties {
  type: 'HTML' | 'JS' | 'CSS' | undefined
}

const { type } = defineProps<Properties>()
</script>

<template>
  <JsIcon v-if="type === 'JS'" class="size-5" />
  <HtmlIcon v-if="type === 'HTML'" class="size-5" />
  <CssIcon v-if="type === 'CSS'" class="size-5" />
</template>
