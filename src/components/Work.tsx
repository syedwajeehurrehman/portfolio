import { projects } from '../data/projects'
import { site } from '../data/site'
import { Icon } from './Icon'
import { ProjectCard } from './ProjectCard'
import { SectionHeader } from './SectionHeader'

export function Work() {
  const featured = projects.filter((p) => p.featured)
  const explore = (
    <a className="btn btn--ghost" href={site.behance} target="_blank" rel="noopener noreferrer">
      <Icon name="behance" size={18} />
      Explore Full Portfolio
    </a>
  )
  return (
    <section className="section section--work" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          index="02"
          label="Selected work"
          id="work-title"
          title={
            <>
              Product, web &amp; <em>brand</em> work.
            </>
          }
          aside={<div className="hide-sm">{explore}</div>}
          intro="A selection from my Behance portfolio. Each card opens the full project."
        />
        <div className="work-grid">
          {featured.map((p, i) => (
            <ProjectCard key={p.url} p={p} large={i < 2} />
          ))}
        </div>
        <div className="work-more">
          <p>
            More projects, including logo, packaging and identity work, are on{' '}
            <a href={site.behance} target="_blank" rel="noopener noreferrer">
              {site.behanceHandle}
            </a>
            .
          </p>
          {explore}
        </div>
      </div>
    </section>
  )
}
