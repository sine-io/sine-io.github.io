import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createAppRouter } from './router'

export function App() {
  const [router] = useState(createAppRouter)
  return <RouterProvider router={router} />
}
