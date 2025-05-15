<script setup lang="ts">
import PanelTItle from '@/components/PanelTitle/PanelTItle.vue'
import { ref } from 'vue'
import FileIcon from './components/FileIcon/FileIcon.vue'
interface Files {
  name: string
  content: string
  id: number
  language: 'JS' | 'HTML' | 'CSS'
}
const files = ref<Files[]>([
  { id: 1, name: 'index.html', content: '', language: 'HTML' },
  { id: 2, name: 'style.css', content: '', language: 'CSS' },
  { id: 3, name: 'app.js', content: '', language: 'JS' },
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
          <li
            v-for="item in files"
            :key="item.id"
            class="px-5 hover:bg-gray-900 cursor-pointer select-none transition-colors"
            @click="handleSelectFile(item.id)"
          >
            <h6 class="text-white flex items-center gap-1">
              <FileIcon :type="item.language" /> {{ item.name }}
            </h6>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
