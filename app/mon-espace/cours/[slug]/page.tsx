"use client"
import React, { use, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Play, Pause, SkipBack, SkipForward, Maximize2,
  ChevronDown, ChevronUp, ChevronRight,
  Clock, BookOpen, CheckCircle, Lock,
  ThumbsUp, ArrowRight, Home,
} from 'lucide-react'
import { useRole } from '../../../hooks/useRole'
import { Button } from "@/components/ui";
import { useStoreChapters } from '../../../stores/chapters'
import { DeltaRenderer } from '@/components/shared/DeltaRenderer'
import Prerequis from './prerequis/Prerequis'
import Targets from './targets/Targets'
import Apercus from './apercus/Apercus'
import Module from './module/Module'
import VideoPlayer from './VideoPlayer'
import Comment from './comment/Comment'
import { usePlayerStore } from '../../../stores/player'

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK = {
 
  title: "Comprendre l'impact énergétique sur la valeur immobilière",
  moduleLabel: 'MODULE 3/6',
  estimatedDuration: '4h 30min',
  totalModules: 6,
  videoProgress: 55,
  instructor: {
    name: 'Sébastien Paumier',
    role: 'Votre formateur',
    avatar: '/images/avatar/avatar-1.jpg',
  },
  apercu: `Dans ce module, vous allez comprendre comment le diagnostic de performance énergétique influence la valeur d'un bien immobilier.\n\nÀ travers l'analyse d'une étiquette énergétique et d'un cas simple d'audit, vous apprendrez à repérer les points faibles d'un logement, identifier une passoire thermique et transformer les résultats du DPE en arguments clairs pour conseiller un propriétaire, un acquéreur ou un vendeur.`,
  modules: [
    { id: 1, title: 'Module 1 - Le DPE en 5 minutes', status: 'completed', lessons: [] },
    { id: 2, title: 'Module 2 - Détecter les passoires thermiques', status: 'completed', lessons: [] },
    {
      id: 3,
      title: "Module 3 - Lire l'étiquette énergétique",
      status: 'active',
      lessons: [
        { id: 1, title: "1 - Lire l'étiquette Aa", status: 'completed' },
        { id: 2, title: "2 - Lire l'étiquette Bb", status: 'completed' },
        { id: 3, title: '3 - DIAGNOSTIQUE DPE', status: 'active' },
        { id: 4, title: "4 - Lire l'étiquette Cd", status: 'pending' },
      ],
    },
    { id: 4, title: 'Module 4 - Impact direct sur la valeur immobilière', status: 'locked', lessons: [] },
    { id: 5, title: "Module 5 - L'impact direct sur la valeur immobilière", status: 'locked', lessons: [] },
    { id: 6, title: "Module 6 - L'impact direct sur la valeur immobilière", status: 'locked', lessons: [] },
    { id: 7, title: "Module 7 - L'impact direct sur la valeur immobilière", status: 'locked', lessons: [] },
  ],
  comments: [
    {
      id: 1,
      user: { name: 'Sébastien Paumier', role: 'Formateur', avatar: '/images/avatar/avatar-1.jpg' },
      text: "Dans ce module, retenez surtout l'impact du DPE sur la valeur du bien et la lecture de l'étiquette énergétique.",
      likes: 12, time: '4 j 1j', replies: 1,
    },
    {
      id: 2,
      user: { name: 'Sébastien Paumier', role: 'Apprenant', avatar: '/images/avatar/avatar-1.jpg' },
      text: "Est-ce qu'on doit connaître toutes les classes énergétiques par coeur pour l'évaluation ?",
      likes: 8, time: '4 j 3j', replies: 0,
    },
    {
      id: 3,
      user: { name: 'Lina M', role: 'Formateur', avatar: '/images/avatar/avatar-5.jpg' },
      text: "Pas forcément par cœur. L'essentiel est de comprendre leur signification et leur impact dans l'analyse.",
      likes: 10, time: '4 j 2j', replies: 0,
    },
    {
      id: 4,
      user: { name: 'Lina M', role: 'Formateur', avatar: '/images/avatar/avatar-5.jpg' },
      text: "Pas forcément par cœur. L'essentiel est de comprendre leur signification et leur impact dans l'analyse.",
      likes: 10, time: '4 j 2j', replies: 0,
    },
    {
      id: 5,
      user: { name: 'John R', role: 'Apprenant', avatar: '/images/avatar/avatar-8.jpg' },
      text: "Est-ce qu'on doit connaître toutes les classes énergétiques par coeur pour l'évaluation ?",
      likes: 0, time: '4 j 5j', replies: 0,
    },
  ],
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type ModStatus = 'completed' | 'active' | 'locked'
type LesStatus = 'completed' | 'active' | 'pending' 

// ─── Video Player ──────────────────────────────────────────────────────────────




// ─── Formation table of contents ───────────────────────────────────────────────



// ─── Comment item ──────────────────────────────────────────────────────────────

// ─── Mobile bottom nav ─────────────────────────────────────────────────────────

function MobileBottomNav() {
  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-dark-750 border-t border-gray-200 dark:border-dark-600/80 flex items-center justify-around px-8 pt-3 pb-4">
      <Link href="/mon-espace" className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-600 transition-colors">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium">Tableau de bord</span>
      </Link>
      <Link
        href="/mon-espace/mes-formations"
        className="flex items-center justify-center w-13 h-13 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg -mt-6"
      >
        <Play className="w-6 h-6 fill-white" />
      </Link>
      <Link href="/mon-espace/mes-formations" className="flex flex-col items-center gap-1 text-green-600">
        <BookOpen className="w-5 h-5" />
        <span className="text-[10px] font-medium">Mes Formations</span>
      </Link>
    </nav>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'apercu' as const, label: 'Aperçu' },
  { key: 'prerequis' as const, label: 'Prérequis' },
  { key: 'targets' as const, label: 'Public conserner' },
  // { key: 'ressources' as const, label: 'Ressources' },
]

export default function FormationSuiviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { currentUser, isApprenant } = useRole()
  const getUserChapter = useStoreChapters((s) => s.getUserChapter);
  const userChapter = useStoreChapters((s) => s.userChapter);
  const currentLessonId = usePlayerStore((s) => s.currentLessonId)
  const setCurrentLesson = usePlayerStore((s) => s.setCurrentLesson)
  const [activeTab, setActiveTab] = useState<'apercu' | 'prerequis' | 'ressources' | 'targets'>('apercu')
  const [expandedModules, setExpandedModules] = useState<number[]>([3])
  const [comment, setComment] = useState('')
  const [normalizedChapter, setNormalizedChapter] = useState<any>(null)

  const reset = useStoreChapters((s) => s.reset);
  const resetPlayer = usePlayerStore((s) => s.reset)

  const  breadcrumb =useMemo(()=>[
    { label: 'Formation', href: '/dashboards/formation' },
    { label: userChapter?.chapter.title, href: `/dashboards/formation/${slug}` },
  ],[userChapter])

  useLayoutEffect(() => {
    resetPlayer();
    reset();
  }, [slug])


  useEffect(() => {
    if (slug) {
      useStoreChapters.getState().getUserChapter(slug)
    }
  }, [slug])


  console.log("chapter", userChapter);

  const toggleModule = (modId: number) => {
    setExpandedModules((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    )
  }

  //Aplatir toutes les leçons dans l'ordre des modules
  const allLessons: { id: string; moduleId: number }[] = useMemo(() => {
    if (!userChapter?.chapter.modules) return []
    return userChapter.chapter.modules.flatMap((mod: any) =>
      (mod.lessons ?? []).map((les: any) => ({ id: les.id, moduleId: Number(mod.id) }))
    )
  }, [userChapter])

  const goToNextLesson = () => {
    if (!allLessons.length) return
    if (!currentLessonId) {
      const first = allLessons[0]
      setCurrentLesson(first.id)
      setExpandedModules((prev) => prev.includes(first.moduleId) ? prev : [...prev, first.moduleId])
      return
    }
    const idx = allLessons.findIndex((l) => l.id === currentLessonId)
    const next = allLessons[idx + 1]
    if (!next) return
    setCurrentLesson(next.id)
    setExpandedModules((prev) => prev.includes(next.moduleId) ? prev : [...prev, next.moduleId])
  }

  const hasNextLesson = !currentLessonId
    ? allLessons.length > 0
    : allLessons.findIndex((l) => l.id === currentLessonId) < allLessons.length - 1

  void slug

  return (
    <>
      <div className="pb-24 xl:pb-6 max-w-7xl mx-auto px-2">
          {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mt-2 text-xs text-gray-400 dark:text-dark-500 uppercase tracking-widest mb-3 flex-wrap">
          {breadcrumb.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="w-3 h-3 text-gray-300 dark:text-dark-600 shrink-0" />}
              {i < breadcrumb.length - 1 ? (
                <Link href={item.href} className="hover:text-green-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600 dark:text-dark-300 font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

          {/* Title */}
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-dark-50 mb-1">
          {userChapter?.title}
        </h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          {userChapter?.chapter?.modules?.length} modules
        </p>

          {/* Main layout */}
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left column */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* Video */}
              <div className="sticky top-0 z-20 -mx-4 px-4 py-2 bg-white dark:bg-dark-800 md:-mx-6 md:px-6">
                <VideoPlayer  />
              </div>

              {/* Instructor + Next module */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={MOCK.instructor.avatar}
                    alt={MOCK.instructor.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-dark-100">
                      {currentUser?.firstname} {""} {currentUser?.lastname}
                    </p>
                    <p className="text-xs text-gray-400">{MOCK.instructor.role}</p>
                  </div>
                </div>
                 <Button color="primary" onClick={goToNextLesson} disabled={!hasNextLesson}>
                  leçon suivante
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                 </Button>
              </div>

              {/* Tabs card */}
              <div className="rounded-2xl bg-white dark:bg-dark-750 border border-gray-200 dark:border-dark-600/80 shadow-soft overflow-hidden">
                <div className="flex border-b border-gray-200 dark:border-dark-600/80">
                  {TABS.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                        activeTab === tab.key
                          ? 'border-green-500 text-green-600 dark:text-green-400'
                          : 'border-transparent text-gray-500 dark:text-dark-400 hover:text-gray-700 dark:hover:text-dark-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-5">
                  {activeTab === 'apercu' && (
                    <>
                      <Apercus chapter={userChapter?.chapter} />
                    </>
                  )}
                  {activeTab === 'prerequis' && (
                    <>
                      <Prerequis chapter={userChapter?.chapter} />
                    </>
                  )}
                  {activeTab === 'targets' && (
                    <>
                     <Targets chapter={userChapter?.chapter} />
                    </>
                  )}
                 
                </div>
              </div>

               {/* Mobile: Formation content accordion */}
              <div className="lg:hidden rounded-2xl bg-white dark:bg-dark-750 border border-gray-200 dark:border-dark-600/80 shadow-soft p-4">
                <Module chapter={userChapter?.chapter} />
              </div>

              {/* Comments */}
              <Comment chapter={userChapter?.chapter}/>
            </div>

            {/* Right sidebar — desktop only */}
            <div className="hidden lg:block w-80 xl:w-96 shrink-0">
             <Module chapter={userChapter?.chapter} />
            </div>
          </div>
      </div>
      <MobileBottomNav />
    </>
  )
}
