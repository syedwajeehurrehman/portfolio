import { approach } from '../data/content'
import { SectionHeader } from './SectionHeader'

export function Approach() {
  return (
    <section className="section" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHeader
          index="04"
          label="Approach"
          id="approach-title"
          title={
            <>
              A simple process, <em>shaped by scope.</em>
            </>
          }
          intro="Every project is different. A logo and a working web app need different depths at each step, so we agree on what each stage involves before we start."
        />
        <ol className="steps">
          {approach.map((s) => (
            <li className="step" key={s.step} data-reveal>
              <span className="step__num">{s.step}</span>
              <span className="step__dot" aria-hidden="true" />
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
