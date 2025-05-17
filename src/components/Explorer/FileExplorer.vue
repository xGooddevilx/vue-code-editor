<!-- eslint-disable @typescript-eslint/prefer-readonly-parameter-types -->
<script setup lang="ts">
import type { FileSystem, File } from '@/types/types'
import ExplorerMenu from './ExplorerMenu.vue'

defineProps<{
  files: (FileSystem | File)[]
  newFileName: string
  isFolderExpanded: (id: string | number) => boolean
}>()

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'select', file: File | FileSystem): void
  (e: 'update:newFileName', value: string): void
}>()
</script>

<template>
  <div class="bg-neutral-800/30">
    <div class="border-b border-gray-800">
      <PanelTItle title="Explorer" />
    </div>
    <input
      :value="newFileName"
      type="text"
      class="bg-gray-600 w-full px-2 text-white"
      placeholder="New file or folder"
      @input="emit('update:newFileName', ($event.target as HTMLInputElement).value)"
    />

    <button
      class="px-2 py-1 text-white bg-neutral-600 w-full cursor-pointer"
      @click="$emit('create')"
    >
      Create
    </button>

    <ExplorerMenu
      v-for="item in files"
      :key="item.id"
      :file="item"
      :is-folder-expanded="isFolderExpanded"
      @select="$emit('select', $event)"
    />
  </div>
</template>
