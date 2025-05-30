import React from 'react'
import { Monitor } from 'lucide-react'

export const SystemMode = () => (
  <div className="flex h-32 w-48 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-700">
    <Monitor className="h-12 w-12 text-gray-600 dark:text-gray-300" />
  </div>
)
