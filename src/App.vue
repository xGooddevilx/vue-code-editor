<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import PanelTItle from '@/components/PanelTitle/PanelTItle.vue'
import FileExplorer from './components/Explorer/FileExplorer.vue'
import { useFileSystem } from './composables/useFileSystem'
import CodeEditor from './components/CodeEditor/CodeEditor.vue'

const { createNewItem, files, handleFileClick, newFileName, selectedFile } = useFileSystem()
</script>

<template>
  <div class="grid grid-cols-[1fr_300px] h-screen bg-gray-700">
    <div class="relative">
      <div class="border-b border-gray-800">
        <PanelTItle :title="'Code'" />
      </div>
      <CodeEditor v-if="selectedFile" v-model:content="selectedFile.content" :file="selectedFile" />
    </div>
    <FileExplorer
      v-model:new-file-name="newFileName"
      :files="files"
      @create="createNewItem"
      @select="handleFileClick"
    />
  </div>
</template>
