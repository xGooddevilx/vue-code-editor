<script lang="ts" setup>
import { computed } from 'vue'
import FileIcon from '../FileIcon/FileIcon.vue'
import AngleIcon from './angleIcon.vue'
import type { File, FileSystem } from '@/types/types'
import { cn } from '@/utils/cn'

interface Properties {
  file: FileSystem | File
  isFolderExpanded: (id: string | number) => boolean
}
const { file, isFolderExpanded } = defineProps<Properties>()

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const hasChildren = computed(() => file._type === 'folder' && file.children.length > 0)

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
          :class="
            cn(
              'text-white flex items-center gap-1 px-2 hover:bg-gray-900 cursor-pointer select-none transition-colors',
              { 'bg-gray-500': folderIsExpanded },
            )
          "
          @click="emit('select', file)"
        >
          <FileIcon :type="file._type === 'file' ? file.language : 'folder'" />
          {{ file.name }}
          <AngleIcon
            v-if="file._type === 'folder'"
            :class="cn('size-2 ms-2 -rotate-90', { 'rotate-0': folderIsExpanded })"
          />
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
