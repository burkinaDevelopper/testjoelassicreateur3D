'use client'
import { Maximize2, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '../../../stores/player'

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const currentLessonId = usePlayerStore((s) => s.currentLessonId)

  useEffect(() => {
    const video = videoRef.current
    if (!currentLessonId || !video) return

    video.src = `/api/lessons/${currentLessonId}/stream`
    video.load()

    const handleCanPlay = () => {
      video.play().then(() => setPlaying(true)).catch(() => {})
    }

    video.addEventListener('canplay', handleCanPlay, { once: true })

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.pause()
      video.src = ''
    }
  }, [currentLessonId])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
      setPlaying(false)
    } else {
      video.play()
      setPlaying(true)
    }
  }

  return (
    <div className="relative w-full aspect-video bg-green-900 rounded-xl overflow-hidden shadow-[1px_19px_9px_-1px_rgba(0,0,0,0.1)]">
      <video
        ref={videoRef}
        id="player"
        className="w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!currentLessonId && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <p className="text-white/70 text-sm">Sélectionnez une leçon pour commencer</p>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={togglePlay}
          className="pointer-events-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
        >
          {playing
            ? <Pause className="w-8 h-8 text-white" />
            : <Play className="w-8 h-8 text-white fill-white ml-1" />
          }
        </button>
      </div>
      <div className="absolute bottom-0 inset-x-0 px-4 pb-3 pt-10 bg-linear-to-t from-black/70 to-transparent">
        <div className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer">
          {/* <div className="h-full bg-green-400 rounded-full relative" style={{ width: `${0}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow" />
          </div> */}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-white/80 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={togglePlay} className="text-white hover:text-green-400 transition-colors">
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>
            <button className="text-white/80 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => videoRef.current?.requestFullscreen()}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
