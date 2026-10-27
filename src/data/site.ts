// Contact details and hero text come from content/profile.json, which the /admin panel edits.
import profile from '../../content/profile.json'

const digits = (s: string) => s.replace(/\D/g, '')
// e.g. country code 92 + local 03415359701 → 923415359701 (leading 0 dropped)
const phoneInternational = digits(profile.phoneCountryCode) + digits(profile.phone).replace(/^0/, '')

export const site = {
  ...profile,
  phoneInternational,
  vcard: '/contact.vcf',
}

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.phoneInternational}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const mailtoUrl = (subject?: string, body?: string) => {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  // URLSearchParams encodes spaces as "+", which some mail apps show literally.
  const query = params.toString().replace(/\+/g, '%20')
  return `mailto:${site.email}${query ? `?${query}` : ''}`
}

export const nav = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' },
]
