<!-- eslint-disable @typescript-eslint/no-magic-numbers -->
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { File } from '@/types/types'
import { reactive } from 'vue'
import { keywords } from '@/constants/Keywords'

const props = defineProps<{ file: File }>()
const emit = defineEmits<(e: 'update:content', value: string) => void>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const highlightRef = ref<HTMLElement | null>(null)

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

interface AutoCompletion {
  suggestions: string[]
  caretPosition: number
  currentWord: string
}
const autoCompletion = reactive<AutoCompletion>({
  caretPosition: 0,
  currentWord: '',
  suggestions: [],
})

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  const { value } = target
  const caret = target.selectionStart || 0
  autoCompletion.caretPosition = caret

  emit('update:content', value)

  const beforeCaret = value.slice(0, caret)

  const match = /[\w.]+$/.exec(beforeCaret)
  autoCompletion.currentWord = match ? match[0] : ''

  if (autoCompletion.currentWord.length > 0) {
    autoCompletion.suggestions = keywords.filter((kw) => kw.startsWith(autoCompletion.currentWord))
  } else {
    autoCompletion.suggestions = []
  }
}

const applySuggestion = (suggestion: string) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const { value } = textarea

  const { caretPosition: caret, currentWord: cursorWord } = autoCompletion
  const start = caret - cursorWord.length
  const end = caret

  const newValue = value.slice(0, start) + suggestion + value.slice(end)
  emit('update:content', newValue)

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  nextTick(() => {
    textarea.focus()
    const newCaret = start + suggestion.length
    textarea.setSelectionRange(newCaret, newCaret)
  })

  autoCompletion.suggestions = []
  autoCompletion.currentWord = ''
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
    <ul
      v-if="autoCompletion.suggestions.length"
      class="absolute z-10 bg-gray-800 border border-gray-600 rounded text-white text-sm mt-1 w-64 shadow-md"
      :style="{ top: '3rem', left: '1rem' }"
    >
      <li
        v-for="(suggestion, i) in autoCompletion.suggestions"
        :key="i"
        class="px-2 py-1 cursor-pointer hover:bg-gray-600"
        @mousedown.prevent="applySuggestion(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>
