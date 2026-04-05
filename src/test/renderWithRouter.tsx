import { render } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'
import { createTestRouter } from '@/app/router'

export function renderWithRouter(path: string) {
  const router = createTestRouter([path])
  return render(<RouterProvider router={router} />)
}
