import { ref } from 'vue'
import type { File, FileSystem, Language } from '@/types/types'

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

  const handleFileClick = (item: File | FileSystem) => {
    currentFolderId.value = null

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

  const addToFolder = (newItem: File | FileSystem, folderId: string | number) => {
    defaultFiles.value = defaultFiles.value.map((item) => {
      if (item.id === folderId && item._type === 'folder') {
        return { ...item, children: [...item.children, newItem] }
      } else {
        return item
      }
    })
  }

  const createNewItem = () => {
    const name = newFileName.value.trim()
    if (!name) return

    const allowedLanguages: Language[] = ['js', 'html', 'css']
    const extension = name.split('.').pop()?.toLowerCase()

    const isFile = extension != null && allowedLanguages.includes(extension as Language)
    const newItem: File | FileSystem = isFile
      ? {
          _type: 'file' as const,
          id: crypto.randomUUID(),
          name,
          content: '',
          language: extension as Language,
        }
      : {
          _type: 'folder' as const,
          id: crypto.randomUUID(),
          name,
          children: [],
        }
    if (currentFolderId.value !== null && currentFolderId.value) {
      addToFolder(newItem, currentFolderId.value)
    } else {
      defaultFiles.value.push(newItem)
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
