import { CheckCircle } from 'lucide-react'


export default function TargetsCard({ item,chapter }: { item: any,chapter:any }) {

  return (
    <li className="flex items-start gap-2.5">
        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
        <span className="text-sm text-gray-600 dark:text-dark-300 leading-relaxed">
        {item?.title}
        </span>
    </li>
  )
}
