import { useEffect, useState } from 'react'
import { site, whatsappUrl } from '../data/site'
import { Icon } from './Icon'

const karachiTime = () =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Karachi' }).format(new Date())

export function BusinessCard() {
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState(karachiTime)

  useEffect(() => {
    const t = window.setInterval(() => setTime(karachiTime()), 30_000)
    return () => window.clearInterval(t)
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <div className="bcard" data-reveal>
      <div className="bcard__face">
        <div className="bcard__top">
          <span className="monogram monogram--lg" aria-hidden="true">
            <img src="/brand/logo-mark.svg" alt="" />
          </span>
          <span className="bcard__loc">{site.location}</span>
        </div>
        <div>
          <p className="bcard__name">{site.name}</p>
          <p className="bcard__role">{site.role}</p>
        </div>
        <dl className="bcard__rows">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                {site.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt>Portfolio</dt>
            <dd>
              <a href={site.behance} target="_blank" rel="noopener noreferrer">
                {site.behanceHandle}
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <p className="bcard__time">
        <span>Local time in Karachi ({site.timezone})</span>
        <strong>{time}</strong>
      </p>
      <div className="bcard__actions">
        <a className="btn btn--ghost btn--sm" href={site.vcard} download>
          <Icon name="download" size={16} />
          Save contact
        </a>
        <button className="btn btn--ghost btn--sm" type="button" onClick={copy} aria-live="polite">
          <Icon name={copied ? 'check' : 'copy'} size={16} />
          {copied ? 'Email copied' : 'Copy email'}
        </button>
        {site.cv && (
          <a className="btn btn--ghost btn--sm" href={site.cv} download="Syed-Wajeeh-Ur-Rehman-CV.pdf">
            <Icon name="download" size={16} />
            Download CV
          </a>
        )}
      </div>
    </div>
  )
}
