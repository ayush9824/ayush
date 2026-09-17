import { useContext } from 'react'
import { VideoModalContext } from '../context/videoModalContext'

export function useVideoModal() {
  const ctx = useContext(VideoModalContext)
  if (!ctx) {
    throw new Error('useVideoModal must be used within a VideoModalProvider')
  }
  return ctx
}