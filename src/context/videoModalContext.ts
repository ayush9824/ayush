import { createContext } from 'react'
import type { Project } from '../data/projects'

export interface VideoModalContextValue {
  openVideo: (project: Project) => void
  closeVideo: () => void
}

export const VideoModalContext = createContext<VideoModalContextValue | null>(
  null,
)