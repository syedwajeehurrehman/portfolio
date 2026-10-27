type Props = {
  index: string
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  aside?: React.ReactNode
  id?: string
}

export function SectionHeader({ index, label, title, intro, aside, id }: Props) {
  return (
    <header className="section-header" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__rule" aria-hidden="true" />
        {label}
      </p>
      <div className="section-header__row">
        <h2 className="section-title" id={id}>
          {title}
        </h2>
        {aside}
      </div>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  )
}
