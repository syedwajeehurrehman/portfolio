import { mailtoUrl, site, whatsappUrl } from '../data/site'
import { HeroVisual } from './HeroVisual'
import { Icon } from './Icon'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__grid container">
        <div className="hero__copy">
          <p className="hero__status" data-reveal>
            {site.available && <span className="pulse" aria-hidden="true" />}
            {site.availabilityText}
            <span className="hero__status-sep" aria-hidden="true">/</span>
            <span className="hero__status-loc">{site.location}</span>
          </p>

          <p className="hero__name" data-reveal>
            {site.name}
            <span className="hero__role">{site.role}</span>
          </p>

          <h1 className="hero__title" id="hero-title" data-reveal>
            {site.headline.split('|').map((part, i) => (
              <span key={i}>
                {part.trim()} <br className="br-lg" />
              </span>
            ))}
            {site.headlineAccent && <em>{site.headlineAccent}</em>}
          </h1>

          <p className="hero__lede" data-reveal>
            {site.intro}
          </p>

          <div className="hero__actions" data-reveal>
            <a className="btn btn--primary" href="#work">
              View My Work
              <Icon name="arrow-down" size={18} />
            </a>
            <a
              className="btn btn--ghost"
              href={whatsappUrl(site.whatsappGreeting)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} />
              Let&rsquo;s Discuss a Project
            </a>
            <a className="btn btn--link" href={mailtoUrl('Project enquiry')}>
              Contact Me
              <Icon name="arrow-up-right" size={18} />
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>

      <div className="hero__disciplines container" data-reveal>
        <ul aria-label="Disciplines">
          {site.disciplines.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
