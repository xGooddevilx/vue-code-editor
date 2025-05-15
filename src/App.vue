<script setup lang="ts">
import PanelTItle from '@/components/PanelTitle/PanelTItle.vue'
import { ref } from 'vue'
import FileIcon from './components/FileIcon/FileIcon.vue'

interface Folder {
  _type: 'folder'
  name: string
  id: number
  children: File[]
}
interface File {
  name: string
  content: string
  id: number
  language: 'JS' | 'HTML' | 'CSS'
  _type: 'file'
}

const files = ref<(Folder | File)[]>([
  {
    id: 1,
    name: 'folder 1',
    _type: 'folder',
    children: [
      { _type: 'file', id: 1, name: 'index.html', content: '', language: 'HTML' },
      { _type: 'file', id: 2, name: 'style.css', content: '', language: 'CSS' },
      { _type: 'file', id: 3, name: 'app.js', content: '', language: 'JS' },
    ],
  },
  { _type: 'file', id: 3, name: 'index.html', content: '', language: 'HTML' },
  { _type: 'file', id: 4, name: 'index.html', content: '', language: 'HTML' },
])

const selectedFile = ref<number | null>(null)
const handleSelectFile = (id: number) => (selectedFile.value = id)
</script>

<template>
  <div class="grid grid-cols-[1fr_300px] h-screen bg-gray-700">
    <div class="">
      <div class="border-b border-gray-800">
        <PanelTItle :title="'Code'" />
      </div>
      <div>
        <pre> hi </pre>
      </div>
    </div>
    <div class="bg-neutral-800/30">
      <div class="border-b border-gray-800">
        <PanelTItle :title="'Explorer'" />
      </div>
      <div class="mt-5">
        <ul>
          <li v-for="item in files" :key="item.id" @click="handleSelectFile(item.id)">
            <h6
              class="text-white flex items-center gap-1 px-2 hover:bg-gray-900 cursor-pointer select-none transition-colors"
            >
              <FileIcon :type="'language' in item ? item.language : undefined" /> {{ item.name }}
            </h6>
            <ul v-if="'children' in item">
              <li
                v-for="file in item.children"
                :key="file.id"
                class="px-5 hover:bg-gray-900 cursor-pointer select-none transition-colors"
              >
                <h6 class="text-white flex items-center gap-1">
                  <FileIcon :type="'language' in file ? file.language : undefined" />
                  {{ file.name }}
                </h6>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
