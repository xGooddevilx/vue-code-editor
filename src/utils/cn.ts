import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const cn = (...input: ClassValue[]): string => twMerge(clsx(input))
