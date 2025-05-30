import React from 'react'
import { Moon } from 'lucide-react'

export const DarkMode = () => (
  <div className="flex h-32 w-48 items-center justify-center rounded-2xl bg-gray-900 dark:bg-gray-900">
    <Moon className="h-12 w-12 text-gray-100 dark:text-gray-200" />
  </div>
)
