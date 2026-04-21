export type UiSize = 'sm' | 'md'

export function inputSizeClasses(size: UiSize) {
  return size === 'sm' ? 'px-2 py-1.5 text-sm' : 'px-3 py-2'
}

export const baseFieldClasses =
  'w-full border border-gray-300 rounded-lg bg-white text-gray-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ' +
  'disabled:bg-gray-100 disabled:cursor-not-allowed'

