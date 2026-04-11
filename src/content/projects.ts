import { opcProjectMeta } from '@/content/opc'

export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
  sections?: Array<{ title: string; body: string[] }>
}

export const projects: Project[] = [
  opcProjectMeta
]
