import { reasons } from '../data/content'
import { Icon } from './Icon'
import { SectionHeader } from './SectionHeader'

export function Why() {
  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="container why">
        <SectionHeader
          index="05"
          label="Why work with me"
          id="why-title"
          title={
            <>
              One partner for <em>product, brand</em> and build.
            </>
          }
        />
        <ul className="why__list">
          {reasons.map((r) => (
            <li key={r.title} data-reveal>
              <span className="why__check" aria-hidden="true">
                <Icon name="check" size={16} />
              </span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
