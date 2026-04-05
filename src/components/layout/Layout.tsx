import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { pageShellMotion } from '@/lib/motion'
import { Navbar } from './Navbar'
import { SineWaveBg } from './SineWaveBg'

export function Layout({ children }: PropsWithChildren) {
  const location = useLocation()

  return (
    <div className="isolate relative min-h-screen overflow-x-clip">
      <SineWaveBg />
      <Navbar />
      <main>
        <motion.div key={`${location.pathname}:${location.key}`} {...pageShellMotion}>
          {children ?? <Outlet />}
        </motion.div>
      </main>
    </div>
  )
}
