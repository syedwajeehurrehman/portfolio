import { about, experience, portrait, tools } from '../data/content'
import { site } from '../data/site'
import { Icon } from './Icon'
import { SectionHeader } from './SectionHeader'

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <SectionHeader
          index="03"
          label="About"
          id="about-title"
          title={
            <>
              A designer who cares how
              <br />
              products <em>actually work.</em>
            </>
          }
        />
        <div className="about__grid">
          <div className="about__copy" data-reveal>
            <p className="about__lead">{about[0]}</p>
            {about.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <aside className="about__side" data-reveal>
            <figure className="portrait">
              <img
                src={portrait}
                alt={`Portrait of ${site.name}`}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span className="pulse" aria-hidden="true" />
                {site.shortName} · {site.location}
              </figcaption>
            </figure>
            <div className="about__block">
              <h3 className="mini-label">Experience &amp; study</h3>
              <ul className="xp">
                {experience.map((x) => (
                  <li key={x.role}>
                    <span className="xp__head">
                      <span className="xp__role">{x.role}</span>
                      {x.years && <span className="xp__years">{x.years}</span>}
                    </span>
                    <span className="xp__place">
                      {x.place}
                      {x.where && <span className="xp__where"> · {x.where}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="about__block">
              <h3 className="mini-label">Tools</h3>
              <ul className="chips">
                {tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            {site.cv && (
              <a className="btn btn--ghost btn--sm about__cv" href={site.cv} download="Syed-Wajeeh-Ur-Rehman-CV.pdf">
                <Icon name="download" size={16} />
                Download my CV
              </a>
            )}
            <p className="about__loc">
              <Icon name="pin" size={16} />
              Based in {site.location}, working with clients remotely.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
