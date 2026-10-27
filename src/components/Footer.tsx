import { site, whatsappUrl } from '../data/site'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__id">
          <a href="#top" className="footer__name">
            <span className="monogram" aria-hidden="true">
              <img src="/brand/logo-mark.svg" alt="" />
            </span>
            {site.name}
          </a>
          <p>{site.summary}</p>
        </div>
        <ul className="footer__links">
          <li>
            <a href={site.behance} target="_blank" rel="noopener noreferrer">
              Behance
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`}>Email</a>
          </li>
          <li>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
        </ul>
        <p className="footer__copy">
          &copy; {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
