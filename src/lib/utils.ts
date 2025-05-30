import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(str: string, maxLength?: number): string {
  return str.slice(0, maxLength || 30) + '...'
}