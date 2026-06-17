import React from 'react'

import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";


const alertConfig = {
  success: {
    colorClass: "this:success",
    title: "Succès",
    icon: CheckCircleIcon,
  },
  warning: {
    colorClass: "this:warning",
    title: "Attention",
    icon: ExclamationTriangleIcon,
  },
};
interface AlertProps {
  type: "success" | "warning";
  message: string;
}
export default function Alert({ type,  message }: AlertProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div className="max-w-2xl space-y-4">
      <div
        role="alert"
        className={`${config.colorClass} overflow-hidden rounded-lg bg-white`}
      >
        <div className="flex bg-this-darker/10">
          <div className="w-1.5 shrink-0 bg-this"></div>
          <div className="px-4 py-3">
            <h2 className="text-lg font-semibold uppercase text-this-darker">
              {config.title}
            </h2>
            <p className="mt-2 text-this-darker">
               {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
