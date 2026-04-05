import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, createMemoryRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { WritingDetailPage } from '@/pages/WritingDetailPage'
import { WritingPage } from '@/pages/WritingPage'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'writing', element: <WritingPage /> },
      { path: 'writing/:slug', element: <WritingDetailPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]

export const router = createBrowserRouter(routes)

export function createTestRouter(initialEntries: string[]) {
  return createMemoryRouter(routes, { initialEntries })
}
