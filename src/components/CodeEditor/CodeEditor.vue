<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { File } from '@/types/types'

const props = defineProps<{ file: File }>()
const emit = defineEmits<(e: 'update:content', value: string) => void>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const highlightRef = ref<HTMLElement | null>(null)

const keywords = [
  'function',
  'const',
  'let',
  'var',
  'if',
  'else',
  'return',
  'console\\.log',
  'while',
  'for',
  '=>',
  'true',
  'false',
  'null',
] as const

const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')

const escapeHTML = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const highlightedContent = computed(() =>
  escapeHTML(props.file.content).replace(keywordRegex, `<span class="text-green-400">$1</span>`),
)

const syncScroll = () => {
  if (!textareaRef.value || !highlightRef.value) return
  highlightRef.value.scrollTop = textareaRef.value.scrollTop
  highlightRef.value.scrollLeft = textareaRef.value.scrollLeft
}

watch(
  () => props.file.content,
  async () => nextTick(syncScroll),
)

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const onInput = (e: Event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const target = e.target as HTMLTextAreaElement
  emit('update:content', target.value)
}
</script>

<template>
  <div class="relative h-full p-2">
    <h3 class="text-white mb-2">{{ file.name }}</h3>
    <pre
      ref="highlightRef"
      class="absolute inset-0 text-white bg-gray-800 whitespace-pre-wrap font-mono overflow-auto pointer-events-none p-2"
      v-html="highlightedContent"
    ></pre>
    <textarea
      ref="textareaRef"
      :value="file.content"
      class="absolute inset-0 bg-transparent text-transparent caret-white font-mono resize-none w-full h-full overflow-auto p-2"
      @input="onInput"
      @scroll="syncScroll"
    ></textarea>
  </div>
</template>
