'use client'
import { Maximize2, Pause, Play, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react'
import React, { useEffect, useRef, useState, useCallback } from 'react'

const HIDE_DELAY = 3000
import { usePlayerStore } from '../../../stores/player'

const SKIP_SECONDS = 10
const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

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
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const playingRef = useRef(false)
  const speedMenuRef = useRef<HTMLDivElement>(null)
  const currentLessonId = usePlayerStore((s) => s.currentLessonId)

  // Sync volume + muted to the video element
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = volume
    video.muted = muted
  }, [volume, muted])

  // Sync playback rate to the video element
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = playbackRate
  }, [playbackRate])

  // Close speed menu when clicking outside
  useEffect(() => {
    if (!showSpeedMenu) return
    const handler = (e: MouseEvent) => {
      if (!speedMenuRef.current?.contains(e.target as Node)) {
        setShowSpeedMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showSpeedMenu])

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

    let playPromise: Promise<void> | undefined

    const handleCanPlay = () => {
      playPromise = video.play()
      playPromise?.then(() => setPlaying(true)).catch(() => {})
    }

    video.addEventListener('canplay', handleCanPlay, { once: true })

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      if (playPromise) {
        playPromise.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
      video.src = ''
    }
  }, [currentLessonId])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
    } else {
      video.play().catch(() => {})
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (val > 0 && muted) setMuted(false)
    if (val === 0) setMuted(true)
  }

  const toggleMute = () => setMuted((m) => !m)

  const VolumeIcon = muted || volume === 0
    ? VolumeX
    : volume < 0.5
      ? Volume1
      : Volume2

  const effectiveVolume = muted ? 0 : volume
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
        {/* Barre de progression */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer group"
        >
          <div
            className="h-full bg-green-400 rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* Gauche : play/pause + skip + volume + temps */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => skip(-SKIP_SECONDS)}
              className="text-white/80 hover:text-white cursor-pointer transition-colors shrink-0"
              title={`Reculer ${SKIP_SECONDS}s`}
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button onClick={togglePlay} className="text-white hover:text-green-400 transition-colors cursor-pointer shrink-0">
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>

            <button
              onClick={() => skip(SKIP_SECONDS)}
              className="text-white/80 hover:text-white cursor-pointer transition-colors shrink-0"
              title={`Avancer ${SKIP_SECONDS}s`}
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group/vol shrink-0">
              <button
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
                title={muted ? 'Activer le son' : 'Couper le son'}
              >
                <VolumeIcon className="w-4 h-4" />
              </button>
              {/* Slider volume */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={effectiveVolume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/vol:w-16 overflow-hidden transition-all duration-200 cursor-pointer h-1 rounded-full appearance-none outline-none"
                style={{
                  background: `linear-gradient(to right, #4ade80 0%, #4ade80 ${effectiveVolume * 100}%, rgba(255,255,255,0.3) ${effectiveVolume * 100}%, rgba(255,255,255,0.3) 100%)`,
                  accentColor: '#4ade80',
                }}
                title={`Volume : ${Math.round(effectiveVolume * 100)}%`}
              />
            </div>

            <span className="text-white/70 text-xs tabular-nums whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Droite : vitesse + plein écran */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sélecteur de vitesse */}
            <div ref={speedMenuRef} className="relative">
              <button
                onClick={() => setShowSpeedMenu((v) => !v)}
                className="text-white/80 hover:text-white text-xs font-semibold tabular-nums transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-white/10"
                title="Vitesse de lecture"
              >
                {playbackRate === 1 ? '1×' : `${playbackRate}×`}
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-xl z-10">
                  {SPEED_OPTIONS.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => { setPlaybackRate(speed); setShowSpeedMenu(false) }}
                      className={`block w-full text-right px-4 py-1.5 text-xs whitespace-nowrap transition-colors cursor-pointer ${
                        speed === playbackRate
                          ? 'bg-green-400/20 text-green-400 font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {speed === 1 ? '1× (normal)' : `${speed}×`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plein écran */}
            <button
              onClick={() => videoRef.current?.requestFullscreen()}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Plein écran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
