import { services, type Service } from '../data/services'
import { SectionHeader } from './SectionHeader'

function FlowArt() {
  return (
    <svg className="svc-art svc-art--flow" viewBox="0 0 260 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="1" y="20" width="44" height="24" rx="6" />
        <rect x="79" y="20" width="44" height="24" rx="6" />
        <rect x="157" y="4" width="44" height="24" rx="6" />
        <rect x="157" y="36" width="44" height="24" rx="6" className="svc-art__hi" />
        <path d="M45 32h34M123 32h17c8 0 8-16 17-16M140 32c8 0 8 16 17 16M201 48h22" />
      </g>
      <circle cx="235" cy="48" r="10" className="svc-art__dot" />
    </svg>
  )
}

function ScreensArt() {
  return (
    <div className="svc-art svc-art--screens" aria-hidden="true">
      <div className="scr scr--desk">
        <span />
        <span />
        <span />
      </div>
      <div className="scr scr--phone">
        <span />
        <span />
      </div>
    </div>
  )
}

const art: Partial<Record<string, React.ReactNode>> = {
  product: <FlowArt />,
  'web-app': <ScreensArt />,
}

function ServiceCard({ s }: { s: Service }) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <article className={`svc svc--${s.size} svc--${s.id}`} onPointerMove={onMove} data-reveal>
      <div className="svc__top">
        <span className="svc__index">{s.index}</span>
        {s.id === 'ai-dev' && <span className="badge badge--accent">Design + build</span>}
      </div>
      {art[s.id]}
      <div className="svc__body">
        <h3 className="svc__title">{s.title}</h3>
        <p className="svc__desc">{s.description}</p>
        <ul className="svc__items">
          {s.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
        {s.note && <p className="svc__note">{s.note}</p>}
      </div>
    </article>
  )
}

export function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader
          index="01"
          label="Services"
          id="services-title"
          title={
            <>
              Design that ships,
              <br />
              from <em>first sketch</em> to working product.
            </>
          }
          intro="Six ways I can help, whether you need a single screen refined or an idea taken all the way to a working prototype."
        />
        <div className="svc-grid">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
