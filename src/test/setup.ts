import '@testing-library/jest-dom'
import { vi } from 'vitest'

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
})

Object.defineProperty(window, 'Request', {
  value: globalThis.Request,
  writable: true
})

Object.defineProperty(window, 'AbortController', {
  value: globalThis.AbortController,
  writable: true
})

Object.defineProperty(window, 'AbortSignal', {
  value: globalThis.AbortSignal,
  writable: true
})
