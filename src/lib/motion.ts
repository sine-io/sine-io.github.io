export const pageShellMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' as const }
}

const sectionRevealBase = {
  initial: { opacity: 0, y: 20 },
  transition: { duration: 0.5, ease: 'easeOut' as const }
}

const canUseViewportReveal = typeof window !== 'undefined' && 'IntersectionObserver' in window

export const sectionRevealMotion = canUseViewportReveal
  ? {
      ...sectionRevealBase,
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 }
    }
  : {
      ...sectionRevealBase,
      animate: { opacity: 1, y: 0 }
    }
