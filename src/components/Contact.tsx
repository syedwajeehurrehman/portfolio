import { mailtoUrl, site, whatsappUrl } from '../data/site'
import { BusinessCard } from './BusinessCard'
import { Icon } from './Icon'
import { InquiryForm } from './InquiryForm'

const channels = [
  {
    label: 'Email Me',
    value: site.email,
    href: mailtoUrl('Project enquiry'),
    icon: 'mail' as const,
    external: false,
  },
  {
    label: 'WhatsApp Me',
    value: site.phoneDisplay,
    href: whatsappUrl(site.whatsappGreeting),
    icon: 'whatsapp' as const,
    external: true,
  },
  {
    label: 'View My Behance',
    value: site.behanceHandle,
    href: site.behance,
    icon: 'behance' as const,
    external: true,
  },
]

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__head" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__index">06</span>
            <span className="eyebrow__rule" aria-hidden="true" />
            Contact
          </p>
          <h2 className="contact__title" id="contact-title">
            Have an idea? <em>Let&rsquo;s make it happen.</em>
          </h2>
          <p className="section-intro">
            Whether you need a product designer, a fresh brand identity, or help turning an idea into a functional
            digital product, let&rsquo;s discuss what you&rsquo;re building.
          </p>
        </div>

        <ul className="channels">
          {channels.map((c) => (
            <li key={c.label} data-reveal>
              <a
                className="channel"
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="channel__icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <span className="channel__text">
                  <span className="channel__label">{c.label}</span>
                  <span className="channel__value">{c.value}</span>
                </span>
                <span className="channel__arrow" aria-hidden="true">
                  <Icon name="arrow-up-right" size={22} />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="contact__grid">
          <div data-reveal>
            <InquiryForm />
          </div>
          <BusinessCard />
        </div>
      </div>
    </section>
  )
}
