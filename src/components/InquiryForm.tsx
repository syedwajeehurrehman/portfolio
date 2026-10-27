import { useState } from 'react'
import { projectTypes } from '../data/content'
import { mailtoUrl, site, whatsappUrl } from '../data/site'
import { Icon } from './Icon'

type Fields = { name: string; email: string; type: string; brief: string }
const empty: Fields = { name: '', email: '', type: '', brief: '' }

const compose = (f: Fields) =>
  [
    `Hi ${site.shortName.split(' ').pop()},`,
    ``,
    f.brief.trim(),
    ``,
    `Project type: ${f.type || 'Not specified'}`,
    `Name: ${f.name.trim()}`,
    `Email: ${f.email.trim()}`,
  ].join('\n')

// There is no backend: the form composes a message and hands it to the visitor's
// email app (or WhatsApp). Nothing is sent from this site.
export function InquiryForm() {
  const [f, setF] = useState<Fields>(empty)
  const [error, setError] = useState('')
  const [handedOff, setHandedOff] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }))

  const validate = (form: HTMLFormElement) => {
    if (!form.checkValidity()) {
      form.reportValidity()
      setError('Please fill in your name, a valid email and a short description.')
      return false
    }
    setError('')
    return true
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate(e.currentTarget)) return
    const subject = `Project enquiry: ${f.type || 'New project'} from ${f.name.trim()}`
    window.location.href = mailtoUrl(subject, compose(f))
    setHandedOff(true)
  }

  const onWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form
    if (!form || !validate(form)) return
    window.open(whatsappUrl(compose(f)), '_blank', 'noopener,noreferrer')
    setHandedOff(true)
  }

  return (
    <form className="inquiry" noValidate onSubmit={onSubmit} aria-describedby="inquiry-note">
      <div className="inquiry__head">
        <h3>Project enquiry</h3>
        <p id="inquiry-note" className="inquiry__note">
          This form doesn&rsquo;t send anything by itself. It opens your email app (or WhatsApp) with your details filled
          in, so you can review and send.
        </p>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input id="f-name" name="name" autoComplete="name" required value={f.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={f.email}
            onChange={set('email')}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-type">Project type</label>
        <div className="select">
          <select id="f-type" name="type" value={f.type} onChange={set('type')}>
            <option value="">Choose one (optional)</option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-brief">Brief description</label>
        <textarea
          id="f-brief"
          name="brief"
          rows={4}
          required
          minLength={10}
          placeholder="What are you building, and what do you need help with?"
          value={f.brief}
          onChange={set('brief')}
        />
      </div>

      <p className="inquiry__error" role="alert" aria-live="assertive">
        {error}
      </p>

      <div className="inquiry__actions">
        <button className="btn btn--primary" type="submit">
          <Icon name="mail" size={18} />
          Compose email
        </button>
        <button className="btn btn--ghost" type="button" onClick={onWhatsApp}>
          <Icon name="whatsapp" size={18} />
          Send via WhatsApp
        </button>
      </div>
      <p className="inquiry__status" role="status" aria-live="polite">
        {handedOff &&
          `Your message is ready in your email app or WhatsApp. If nothing opened, email ${site.email} directly.`}
      </p>
    </form>
  )
}
