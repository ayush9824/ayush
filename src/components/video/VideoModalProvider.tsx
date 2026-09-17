import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  VideoModalContext,
  type VideoModalContextValue,
} from '../../context/videoModalContext'
import type { Project } from '../../data/projects'
import VideoModal from './VideoModal'

/**
 * Provides modal state to any project card / trigger on the site. The video
 * modal overlay itself is always mounted by the provider and only toggles
 * visibility, so it never loses event handling between opens.
 */
export default function VideoModalProvider({
  children,
}: {
  children: ReactNode
}) {
  const [project, setProject] = useState<Project | null>(null)

  const openVideo = useCallback((next: Project) => setProject(next), [])
  const closeVideo = useCallback(() => setProject(null), [])

  const value = useMemo<VideoModalContextValue>(
    () => ({ openVideo, closeVideo }),
    [openVideo, closeVideo],
  )

  return (
    <VideoModalContext.Provider value={value}>
      {children}
      <VideoModal project={project} onClose={closeVideo} />
    </VideoModalContext.Provider>
  )
}