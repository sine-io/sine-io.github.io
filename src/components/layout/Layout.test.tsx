import { act, render, screen } from '@testing-library/react'
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom'
import { siteNav } from '@/content/site'
import { Layout } from './Layout'

describe('Layout', () => {
  it('renders the sticky brand nav, background layer, and child content', () => {
    const { container } = render(
      <MemoryRouter>
        <Layout>
          <p>child content</p>
        </Layout>
      </MemoryRouter>
    )

    expect(container.firstChild).toHaveClass('isolate')
    expect(screen.getByRole('link', { name: /sine-io/i })).toBeInTheDocument()
    expect(screen.getByTestId('sine-wave-bg')).toHaveClass('z-[-1]')
    expect(screen.getByText('child content')).toBeInTheDocument()
    const main = container.querySelector('main')
    expect(main?.firstElementChild?.tagName).toBe('DIV')
  })

  it('renders desktop and mobile navigation links from siteNav', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>child content</p>
        </Layout>
      </MemoryRouter>
    )

    siteNav.forEach((item) => {
      const links = screen.getAllByRole('link', { name: item.label })
      expect(links).toHaveLength(2)
      links.forEach((link) => {
        expect(link).toHaveAttribute('href', item.to)
      })
    })
  })

  it('remounts the page shell when the route pathname changes', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Layout />,
          children: [
            { path: 'one', element: <p>route one</p> },
            { path: 'two', element: <p>route two</p> }
          ]
        }
      ],
      { initialEntries: ['/one'] }
    )

    const { container } = render(<RouterProvider router={router} />)

    expect(screen.getByText('route one')).toBeInTheDocument()
    const firstShell = container.querySelector('main > div')

    await act(async () => {
      await router.navigate('/two')
    })

    expect(screen.getByText('route two')).toBeInTheDocument()
    const secondShell = container.querySelector('main > div')

    expect(secondShell).not.toBe(firstShell)
  })

  it('scrolls to top when the pathname changes', async () => {
    const scrollToMock = vi.fn()
    const originalScrollTo = window.scrollTo
    window.scrollTo = scrollToMock

    try {
      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: <Layout />,
            children: [
              { path: 'one', element: <p>route one</p> },
              { path: 'two', element: <p>route two</p> }
            ]
          }
        ],
        { initialEntries: ['/one'] }
      )

      render(<RouterProvider router={router} />)

      scrollToMock.mockClear()

      await act(async () => {
        await router.navigate('/two')
      })

      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' })
    } finally {
      window.scrollTo = originalScrollTo
    }
  })

  it('does not remount the page shell for hash-only navigation on the same pathname', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Layout />,
          children: [{ path: 'writing', element: <p>writing route</p> }]
        }
      ],
      { initialEntries: ['/writing'] }
    )

    const { container } = render(<RouterProvider router={router} />)

    expect(screen.getByText('writing route')).toBeInTheDocument()
    const firstShell = container.querySelector('main > div')

    await act(async () => {
      await router.navigate('/writing#notes')
    })

    expect(screen.getByText('writing route')).toBeInTheDocument()
    const secondShell = container.querySelector('main > div')

    expect(secondShell).toBe(firstShell)
  })

  it('does not scroll to top for hash-only navigation on the same pathname', async () => {
    const scrollToMock = vi.fn()
    const originalScrollTo = window.scrollTo
    window.scrollTo = scrollToMock

    try {
      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: <Layout />,
            children: [{ path: 'writing', element: <p>writing route</p> }]
          }
        ],
        { initialEntries: ['/writing'] }
      )

      render(<RouterProvider router={router} />)

      scrollToMock.mockClear()

      await act(async () => {
        await router.navigate('/writing#notes')
      })

      expect(scrollToMock).not.toHaveBeenCalled()
    } finally {
      window.scrollTo = originalScrollTo
    }
  })
})
