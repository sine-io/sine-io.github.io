import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroArt from '@/assets/visuals/svg1-optimized.svg'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'

const heroNodes = [
  { cx: 12, cy: 24, r: 1.2 },
  { cx: 26, cy: 14, r: 1.4 },
  { cx: 42, cy: 28, r: 1.1 },
  { cx: 61, cy: 18, r: 1.3 },
  { cx: 79, cy: 32, r: 1.2 },
  { cx: 90, cy: 20, r: 1.1 }
]

const heroPaths = [
  { d: 'M12 24L26 14L42 28L61 18L79 32' },
  { d: 'M61 18L90 20' }
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <Container>
        <GlassPanel
          variant="default"
          className="relative isolate w-full overflow-hidden border-[#A6DEFC]/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(10,20,44,0.78))] shadow-[0_0_0_1px_rgba(166,222,252,0.12),0_36px_120px_rgba(0,0,0,0.46),0_0_64px_rgba(93,227,233,0.14),inset_0_1px_0_rgba(255,255,255,0.14)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(166,222,252,0.12),rgba(166,222,252,0))]" />
          <div className="pointer-events-none absolute left-[-12%] top-[-24%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.18),rgba(93,227,233,0))]" />
          <div className="pointer-events-none absolute right-[-16%] top-[-18%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(123,44,191,0.18),rgba(123,44,191,0))]" />

          <ConstellationField
            testId="hero-constellation"
            nodes={heroNodes}
            paths={heroPaths}
            className="pointer-events-none absolute right-[10%] top-[14%] h-[48%] w-[42%] opacity-75"
          />

          <img
            data-testid="hero-art"
            src={heroArt}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-10%] right-[-8%] h-[88%] max-w-[36rem] object-contain opacity-80"
          />

          <div className="relative z-10 flex min-h-[26rem] flex-col items-center justify-center px-6 py-20 text-center">
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              Hi, I&apos;m sine-io.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="mt-6 bg-gradient-to-r from-[#00E5FF] to-[#7B2CBF] bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl"
            >
              Input / Output the Future.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/writing#guides"
                className="rounded-full bg-[#00E5FF] px-6 py-3 text-sm font-semibold text-[#0A1128] shadow-[0_0_0_rgba(0,229,255,0)] transition hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(0,229,255,0.45)]"
              >
                Read Tutorials
              </Link>

              <a
                href="https://github.com/sine-io"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#00E5FF] bg-transparent px-6 py-3 text-sm font-semibold text-[#00E5FF] transition hover:bg-[#00E5FF] hover:text-[#0A1128]"
              >
                GitHub Profile
              </a>
            </motion.div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  )
}
