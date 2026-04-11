import { afterEach, describe, expect, it, vi } from 'vitest'

describe('router factory', () => {
  afterEach(() => {
    vi.resetModules()
    vi.unmock('react-router-dom')
  })

  it('does not create a browser router when importing the test router factory', async () => {
    const createBrowserRouter = vi.fn()
    const createMemoryRouter = vi.fn()
    const createHashRouter = vi.fn()

    vi.doMock('react-router-dom', async () => {
      const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
      return {
        ...actual,
        createBrowserRouter,
        createHashRouter,
        createMemoryRouter
      }
    })

    const routerModule = await import('./router')

    expect(createBrowserRouter).not.toHaveBeenCalled()

    routerModule.createTestRouter(['/'])

    expect(createMemoryRouter).toHaveBeenCalledTimes(1)
    expect(createBrowserRouter).not.toHaveBeenCalled()
  })

  it('creates the app router with hash routing', async () => {
    const createBrowserRouter = vi.fn()
    const createMemoryRouter = vi.fn()
    const createHashRouter = vi.fn()

    vi.doMock('react-router-dom', async () => {
      const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
      return {
        ...actual,
        createBrowserRouter,
        createHashRouter,
        createMemoryRouter
      }
    })

    const routerModule = await import('./router')

    routerModule.createAppRouter()

    expect(createHashRouter).toHaveBeenCalledTimes(1)
    expect(createBrowserRouter).not.toHaveBeenCalled()
  })
})
