import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeHost(input: string) {
  try {
    return input.trim().replace('https://', '').replace('http://', '').replace(/\/$/, '')
  } catch {
    return ''
  }
}

const hostPortRe = /^(?=.{1,255}$)(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))*(:\d{1,5})?$/i
export function isValidHost(h: string) {
  return !!h && hostPortRe.test(h)
}