<script lang="ts" setup>
import type { Language } from '@/types/types'
import CssIcon from './cssIcon.vue'
import FolderIcon from './folderIcon.vue'
import HtmlIcon from './htmlIcon.vue'
import JsIcon from './jsIcon.vue'

interface Properties {
  type: Language | 'folder'
}

const { type } = defineProps<Properties>()
</script>

<template>
  <JsIcon v-if="type === 'js'" class="size-5" />
  <HtmlIcon v-if="type === 'html'" class="size-5" />
  <CssIcon v-if="type === 'css'" class="size-5" />
  <FolderIcon v-if="type === 'folder'" class="size-5" />
</template>
