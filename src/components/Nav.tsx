import { useEffect, useRef, useState } from 'react'
import { nav, site, whatsappUrl } from '../data/site'
import { Icon } from './Icon'

export function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth > 900 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">
            <img src="/brand/logo-mark.svg" alt="" />
          </span>
          <span className="nav__name">{site.shortName}</span>
          <span className="sr-only">, back to top</span>
        </a>

        <nav aria-label="Primary" className="nav__links">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {site.cv && (
          <a className="btn btn--ghost btn--sm nav__cv" href={site.cv} download="Syed-Wajeeh-Ur-Rehman-CV.pdf">
            <Icon name="download" size={16} />
            Download CV
          </a>
        )}

        <a className="btn btn--primary btn--sm nav__cta" href="#contact">
          Let&rsquo;s talk
          <Icon name="arrow-right" size={16} />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile" className="container">
          <ol className="mobile-menu__list">
            {nav.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
                <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="mobile-menu__foot">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp {site.phoneDisplay}
            </a>
            {site.cv && (
              <a href={site.cv} download="Syed-Wajeeh-Ur-Rehman-CV.pdf">
                Download CV
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
