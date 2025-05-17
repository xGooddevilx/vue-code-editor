<script lang="ts" setup>
import { computed } from 'vue'
import FileIcon from '../FileIcon/FileIcon.vue'
import type { File, FileSystem } from '@/types/types'

interface Properties {
  file: FileSystem | File
  isFolderExpanded: (id: string | number) => boolean
}
const { file, isFolderExpanded } = defineProps<Properties>()

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const hasChildren = computed(() => file._type === 'folder' && file.children.length > 0)

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const emit = defineEmits<(e: 'select', file: File | FileSystem) => void>()

const folderIsExpanded = computed(() =>
  file._type === 'folder' ? isFolderExpanded(file.id) : false,
)
</script>

<template>
  <div>
    <ul>
      <li>
        <h6
          class="text-white flex items-center gap-1 px-2 hover:bg-gray-900 cursor-pointer select-none transition-colors"
          @click="emit('select', file)"
        >
          <FileIcon :type="file._type === 'file' ? file.language : 'folder'" /> {{ file.name }}
        </h6>
      </li>
      <ul v-if="hasChildren && folderIsExpanded" class="pl-2">
        <ExplorerMenu
          v-for="item in (file as FileSystem).children"
          :key="item.id"
          :file="item"
          :is-folder-expanded="isFolderExpanded"
          @select="emit('select', $event)"
        />
      </ul>
    </ul>
  </div>
</template>
