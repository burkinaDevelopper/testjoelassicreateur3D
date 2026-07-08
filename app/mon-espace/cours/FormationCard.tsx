import React from 'react'
import { Avatar, Button, Card ,Checkbox} from "@/components/ui";
import {
  AcademicCapIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  LockClosedIcon,
  LockOpenIcon
} from "@heroicons/react/24/outline";
import moment from 'moment';
import Link from 'next/link';
import { DeltaRenderer } from '@/components/shared/DeltaRenderer'

interface PropsChapter {
  title: string
  description: string
  slug: string
  price: number
  duration: number
  created_at: string
  id: string
  users: any[]
  modules: any[]
}

export default function FormationCard({chapter,creator}:{chapter:PropsChapter,creator:any}) {
  return (
    <Card className="space-y-4 p-4 sm:p-5 max-w-sm">
      {/* Header avec titre et status */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <h3 className="dark:text-dark-100 font-semibold text-gray-800 ">
            {chapter.title}
          </h3>
          <div className="overflow-hidden text-ellipsis">
            <DeltaRenderer plain className="line-clamp-2"
            value={chapter?.description} />
          </div>
        </div>
       
        <div className="flex gap-2">
         
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            chapter?.price==0? 
              "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
              : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
          }`}>
            {chapter?.price==0 ? "Gratuit" : "Payant"}
          </span>
         
        </div>
      </div>

      {/* Creator info */}
      <div className="border-t border-gray-200 dark:border-dark-500 pt-3">
        <p className="dark:text-dark-400 text-xs text-gray-500 mb-2">Créateur</p>
        <div className="flex items-center gap-2">
          <Avatar
            size={8}
            name={`${creator?.firstname} ${creator?.lastname}`}
            initialColor="auto"
          />
          <div className="flex-1 min-w-0">
            <p className="dark:text-dark-100 text-sm font-medium text-gray-800 truncate">
              {creator?.firstname} {creator?.lastname}
            </p>
            <p className="dark:text-dark-400 text-xs text-gray-500 truncate">
              {creator?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-gray-200 dark:border-dark-500 pt-3">
        <div className="grid grid-cols-3 gap-2">
          {chapter?.users?.length > 0 && (
          <div className="text-center">
            <AcademicCapIcon className="size-4 mx-auto mb-1 text-primary-600" />
            <p className="dark:text-dark-400 text-xs text-gray-600">
              {chapter?.users?.length || 0}
            </p>
            <p className="dark:text-dark-500 text-xs text-gray-400">Apprenants</p>
          </div>
          )}
         
          <div className="text-center">
            <BookOpenIcon className="size-4 mx-auto mb-1 text-primary-600" />
            <p className="dark:text-dark-400 text-xs text-gray-600">
              {chapter.modules?.length || 0}
            </p>
            <p className="dark:text-dark-500 text-xs text-gray-400">Modules</p>
          </div>
          <div className="text-center">
            <CalendarDaysIcon className="size-4 mx-auto mb-1 text-primary-600" />
            <p className="dark:text-dark-400 text-xs text-gray-600">
              {moment(chapter.created_at).format("DD/MM/YY")}
            </p>
            <p className="dark:text-dark-500 text-xs text-gray-400">Créé</p>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="border-t border-gray-200 dark:border-dark-500 pt-3">
        <Link href={`/mon-espace/cours/${chapter.slug}`}>
          <Button className="w-full" color="primary" variant="soft">
            Voir le détail
          </Button>
        </Link>
      </div>
    
    </Card>
  )
}
