'use client'
import { Maximize2, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import React, { useEffect, useRef, useState, useCallback } from 'react'

const HIDE_DELAY = 3000 // ms avant de cacher les contrôles
import { usePlayerStore } from '../../../stores/player'

const SKIP_SECONDS = 10

function formatTime(s: number) {
  if (!s || isNaN(s) || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const playingRef = useRef(false)
  const currentLessonId = usePlayerStore((s) => s.currentLessonId)

  const showControls = useCallback(() => {
    setControlsVisible(true)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (playingRef.current) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), HIDE_DELAY)
    }
  }, [])

  useEffect(() => {
    playingRef.current = playing
    if (!playing) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      setControlsVisible(true)
    } else {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), HIDE_DELAY)
    }
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current) }
  }, [playing])

  useEffect(() => {
    const video = videoRef.current
    if (!currentLessonId || !video) return

    setCurrentTime(0)
    setDuration(0)
    setPlaying(false)

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
    } else {
      video.play()
    }
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const bar = progressRef.current
    if (!video || !bar || !duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    video.currentTime = ratio * duration
  }, [duration])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className="relative w-full aspect-video bg-green-900 rounded-xl overflow-hidden shadow-[1px_19px_9px_-1px_rgba(0,0,0,0.1)]"
      style={{ cursor: controlsVisible ? 'default' : 'none' }}
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onTouchStart={showControls}
    >
      <video
        ref={videoRef}
        id="player"
        className="w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {!currentLessonId && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <p className="text-white/70 text-sm">Sélectionnez une leçon pour commencer</p>
        </div>
      )}

      {/* Centre : bouton play/pause */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <button
          onClick={togglePlay}
          className="pointer-events-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
        >
          {playing
            ? <Pause className="w-8 h-8 text-white cursor-pointer" />
            : <Play className="w-8 h-8 text-white fill-white ml-1 cursor-pointer" />
          }
        </button>
      </div>

      {/* Bas : barre de progression + contrôles */}
      <div
        className={`absolute bottom-0 inset-x-0 px-4 pb-3 pt-10 bg-linear-to-t from-black/70 to-transparent transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-1 bg-white/30 rounded-full mb-2 cursor-pointer group"
        >
          <div
            className="h-full bg-green-400 rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => skip(-SKIP_SECONDS)}
              className="text-white/80 hover:text-white cursor-pointer transition-colors"
              title={`Reculer ${SKIP_SECONDS}s`}
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={togglePlay} className="text-white hover:text-green-400 transition-colors cursor-pointer">
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>
            <button
              onClick={() => skip(SKIP_SECONDS)}
              className="text-white/80 hover:text-white cursor-pointer transition-colors"
              title={`Avancer ${SKIP_SECONDS}s`}
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <span className="text-white/70 text-xs tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
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
