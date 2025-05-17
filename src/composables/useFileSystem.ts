import { ref } from 'vue'
import type { File, FileSystem, Language } from '@/types/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFileSystem = () => {
  const defaultFiles = ref<(FileSystem | File)[]>([
    {
      id: crypto.randomUUID(),
      name: 'folder 1',
      _type: 'folder',
      children: [
        {
          _type: 'file',
          id: crypto.randomUUID(),
          name: 'index.html',
          content: '<!DOCTYPE html>\n<html></html>',
          language: 'html',
        },
        {
          _type: 'file',
          id: crypto.randomUUID(),
          name: 'style.css',
          content: 'body { margin: 0; }',
          language: 'css',
        },
      ],
    },
    {
      _type: 'file',
      id: crypto.randomUUID(),
      name: 'main.js',
      content: 'console.log("Hello World")',
      language: 'js',
    },
  ])

  const selectedFile = ref<File | null>(null)
  const newFileName = ref('')

  const currentFolderId = ref<string | number | null>(null)
  const extendedFoldersId = ref<Set<string | number>>(new Set())

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleFileClick = (item: File | FileSystem) => {
    if (item._type === 'file') {
      selectedFile.value = item
    } else {
      if (extendedFoldersId.value.has(item.id)) {
        extendedFoldersId.value.delete(item.id)
      } else {
        currentFolderId.value = item.id
        extendedFoldersId.value.add(item.id)
      }
    }
  }

  const isFolderExpanded = (id: string | number) => extendedFoldersId.value.has(id)

  const createNewItem = () => {
    const name = newFileName.value.trim()
    if (!name) return

    const allowedLanguages: Language[] = ['js', 'html', 'css']
    const extension = name.split('.').pop()?.toLowerCase()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    if (extension != null && allowedLanguages.includes(extension as Language)) {
      defaultFiles.value.push({
        _type: 'file',
        id: crypto.randomUUID(),
        name,
        content: '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        language: extension as Language,
      })
    } else {
      defaultFiles.value.push({
        _type: 'folder',
        id: crypto.randomUUID(),
        name,
        children: [],
      })
    }

    newFileName.value = ''
  }

  return {
    files: defaultFiles,
    selectedFile,
    newFileName,
    handleFileClick,
    createNewItem,
    currentFolderId,
    extendedFoldersId,
    isFolderExpanded,
  }
}
