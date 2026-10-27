import { useEffect, useRef } from 'react'

// A composed, decorative illustration: a design frame, a phone screen, a code window
// and a collaborator cursor, standing in for "design → build". Hidden from assistive tech.
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - (r.left + r.width / 2)) / r.width
        const y = (e.clientY - (r.top + r.height / 2)) / r.height
        el.style.setProperty('--px', Math.max(-1, Math.min(1, x)).toFixed(3))
        el.style.setProperty('--py', Math.max(-1, Math.min(1, y)).toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="hv" ref={ref} aria-hidden="true">
      <div className="hv__glow" />
      <div className="hv__grid" />

      {/* Design frame with a dashboard inside */}
      <div className="hv__frame hv__layer" style={{ '--depth': 10 } as React.CSSProperties}>
        <div className="hv__frame-label">
          <span className="hv__hash">#</span> Dashboard / Overview <span className="hv__dim">1440</span>
        </div>
        <div className="hv__frame-body">
          <div className="hv__side">
            <span className="hv__logo" />
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`hv__nav ${i === 1 ? 'is-on' : ''}`} />
            ))}
          </div>
          <div className="hv__main">
            <div className="hv__row">
              <span className="hv__line w40" />
              <span className="hv__pill" />
            </div>
            <div className="hv__kpis">
              {[0, 1, 2].map((i) => (
                <div key={i} className="hv__kpi">
                  <span className="hv__line w50 sm" />
                  <span className="hv__line w70 lg" />
                </div>
              ))}
            </div>
            <div className="hv__chart">
              <svg viewBox="0 0 300 110" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hvFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--accent)" stopOpacity=".28" />
                    <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="hv__area"
                  d="M0 86 C30 80 45 62 75 66 S120 88 150 58 S205 30 230 40 S275 22 300 14 V110 H0Z"
                  fill="url(#hvFill)"
                />
                <path
                  className="hv__stroke"
                  d="M0 86 C30 80 45 62 75 66 S120 88 150 58 S205 30 230 40 S275 22 300 14"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="hv__table">
              {[0, 1, 2].map((i) => (
                <div key={i} className="hv__tr">
                  <span className="hv__avatar" />
                  <span className="hv__line w30" />
                  <span className="hv__line w20" />
                  <span className={`hv__tag ${i === 0 ? 'is-on' : ''}`} />
                </div>
              ))}
            </div>
          </div>
          {/* selection outline */}
          <div className="hv__select">
            <i /> <i /> <i /> <i />
            <span className="hv__size">412 × 168</span>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="hv__phone hv__layer" style={{ '--depth': 22 } as React.CSSProperties}>
        <div className="hv__notch" />
        <div className="hv__phone-body">
          <span className="hv__line w40 sm" />
          <span className="hv__line w80 lg" />
          <div className="hv__card-sm accent" />
          <div className="hv__list">
            {[0, 1, 2].map((i) => (
              <div key={i} className="hv__li">
                <span className="hv__sq" />
                <span className="hv__line w60" />
              </div>
            ))}
          </div>
          <span className="hv__btn" />
        </div>
      </div>

      {/* Code window */}
      <div className="hv__code hv__layer" style={{ '--depth': 30 } as React.CSSProperties}>
        <div className="hv__code-bar">
          <span /> <span /> <span />
          <em>App.tsx</em>
        </div>
        <pre>
          <code>
            <span className="t-k">export</span> <span className="t-k">function</span> <span className="t-f">App</span>() {'{'}
            {'\n  '}
            <span className="t-k">return</span> (
            {'\n    '}
            <span className="t-t">&lt;Dashboard</span>
            {'\n      '}
            <span className="t-a">layout</span>=<span className="t-s">"overview"</span>
            {'\n      '}
            <span className="t-a">onReady</span>={'{'}ship{'}'}
            {'\n    '}
            <span className="t-t">/&gt;</span>
            {'\n  '})
            {'\n'}
            {'}'}
            <span className="hv__caret" />
          </code>
        </pre>
      </div>

      {/* Type + colour specimen */}
      <div className="hv__spec hv__layer" style={{ '--depth': 16 } as React.CSSProperties}>
        <span className="hv__aa">Aa</span>
        <span className="hv__sw" style={{ background: 'var(--accent)' }} />
        <span className="hv__sw" style={{ background: 'var(--text)' }} />
        <span className="hv__sw" style={{ background: '#2a2a27' }} />
      </div>

      {/* Collaborator cursor */}
      <div className="hv__cursor">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M1 1l6.5 15 2.2-6.3L16 7.5 1 1Z" fill="var(--accent)" stroke="var(--bg)" strokeWidth="1.2" />
        </svg>
        <span>Wajeeh</span>
      </div>
    </div>
  )
}
