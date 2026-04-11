import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { useHashScroll } from '@/hooks/useHashScroll'

function HashScrollFixture() {
  useHashScroll()

  return (
    <div>
      <section id="target">Target section</section>
    </div>
  )
}

describe('useHashScroll', () => {
  it('scrolls to the element matching the current hash', () => {
    const originalScrollIntoView = Element.prototype.scrollIntoView
    const scrollIntoViewMock = vi.fn()

    Element.prototype.scrollIntoView = scrollIntoViewMock

    try {
      const router = createMemoryRouter(
        [{ path: '/opc', element: <HashScrollFixture /> }],
        { initialEntries: ['/opc#target'] }
      )

      render(<RouterProvider router={router} />)

      const target = document.getElementById('target')
      expect(target).not.toBeNull()
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
      expect(scrollIntoViewMock.mock.instances).toContain(target)
    } finally {
      Element.prototype.scrollIntoView = originalScrollIntoView
    }
  })

  it('does nothing when the hash target is missing', () => {
    const originalScrollIntoView = Element.prototype.scrollIntoView
    const scrollIntoViewMock = vi.fn()

    Element.prototype.scrollIntoView = scrollIntoViewMock

    try {
      const router = createMemoryRouter(
        [{ path: '/opc', element: <HashScrollFixture /> }],
        { initialEntries: ['/opc#missing'] }
      )

      render(<RouterProvider router={router} />)

      expect(scrollIntoViewMock).not.toHaveBeenCalled()
    } finally {
      Element.prototype.scrollIntoView = originalScrollIntoView
    }
  })
})
