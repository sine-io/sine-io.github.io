import type { PropsWithChildren } from 'react'
import { Navbar } from './Navbar'
import { SineWaveBg } from './SineWaveBg'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="isolate relative min-h-screen overflow-x-clip">
      <SineWaveBg />
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
