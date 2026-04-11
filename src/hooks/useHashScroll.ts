import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const target = document.getElementById(location.hash.slice(1))

    if (target) {
      target.scrollIntoView()
    }
  }, [location.hash])
}
