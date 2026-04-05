import { useEffect, type PropsWithChildren } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { pageShellMotion } from '@/lib/motion'
import { Navbar } from './Navbar'
import { SineWaveBg } from './SineWaveBg'

export function Layout({ children }: PropsWithChildren) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return (
    <div className="isolate relative min-h-screen overflow-x-clip">
      <SineWaveBg />
      <Navbar />
      <main>
        <MotionConfig reducedMotion="user">
          <motion.div key={location.pathname} {...pageShellMotion}>
            {children ?? <Outlet />}
          </motion.div>
        </MotionConfig>
      </main>
    </div>
  )
}
