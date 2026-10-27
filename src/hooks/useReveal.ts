import { useEffect } from 'react'

// Fades elements marked with [data-reveal] in as they enter the viewport.
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    document.documentElement.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el, i) => {
      // Stagger siblings that enter together.
      el.style.setProperty('--reveal-delay', `${(i % 4) * 60}ms`)
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}
