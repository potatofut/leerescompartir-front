import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina y fusiona clases CSS de Tailwind de manera inteligente
 * Permite combinar múltiples clases y maneja automáticamente los conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
