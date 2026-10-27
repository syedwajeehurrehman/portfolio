import { useState } from 'react'
import type { Project } from '../data/projects'
import { Icon } from './Icon'

// Tries the 808px thumbnail first, then the 404px original, then a typographic fallback cover.
export function ProjectCard({ p, large }: { p: Project; large?: boolean }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0)
  const [loaded, setLoaded] = useState(false)
  const hiRes = p.image.replace('/projects/404/', '/projects/808/')
  const src = stage === 0 ? hiRes : p.image

  return (
    <a
      className={`work-card ${large ? 'work-card--large' : ''}`}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
    >
      <div className={`work-card__media ${loaded ? 'is-loaded' : ''}`}>
        {stage < 2 ? (
          <img
            key={stage}
            src={src}
            alt={`Cover image for ${p.title}, ${p.client}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            width={808}
            height={632}
            onLoad={() => setLoaded(true)}
            onError={() => setStage((s) => (s + 1) as 0 | 1 | 2)}
          />
        ) : (
          <div className="work-card__fallback" role="img" aria-label={`${p.title}, ${p.client}`}>
            <span className="work-card__fallback-cat">{p.category}</span>
            <span className="work-card__fallback-title">{p.title}</span>
            <span className="work-card__fallback-sub">{p.client}</span>
          </div>
        )}
        <span className="work-card__go" aria-hidden="true">
          <Icon name="arrow-up-right" size={20} />
        </span>
      </div>
      <div className="work-card__meta">
        <div>
          <h3 className="work-card__title">
            {p.title}
            <span className="work-card__client"> · {p.client}</span>
          </h3>
          <p className="work-card__desc">{p.description}</p>
        </div>
        <ul className="work-card__tags" aria-label="Tags">
          <li>{p.category}</li>
          {p.team && <li title="Credited to several contributors on Behance">Team project</li>}
        </ul>
      </div>
      <span className="sr-only"> (opens Behance in a new tab)</span>
    </a>
  )
}
