export type Language = 'js' | 'html' | 'css'

export interface FileSystem {
  _type: 'folder'
  name: string
  id: number | string
  children: (File | FileSystem)[]
}

export interface File {
  _type: 'file'
  name: string
  content: string
  id: number | string
  language: Language
}
