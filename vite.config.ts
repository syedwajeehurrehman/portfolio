import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv, type Plugin } from 'vite'

type Profile = {
  name: string
  role: string
  summary: string
  email: string
  phone: string
  phoneCountryCode: string
  location: string
  behance: string
}

const readProfile = (): Profile => JSON.parse(readFileSync('content/profile.json', 'utf8'))
const intlPhone = (p: Profile) => p.phoneCountryCode.replace(/\D/g, '') + p.phone.replace(/\D/g, '').replace(/^0/, '')
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const vcfEsc = (s: string) => s.replace(/([,;\\])/g, '\\$1')

// Builds the downloadable contact card from content/profile.json, so admin edits keep it in sync.
const vcard = (p: Profile) => {
  const parts = p.name.trim().split(/\s+/)
  const last = parts.length > 1 ? parts.pop()! : ''
  const [city, country = ''] = p.location.split(',').map((s) => s.trim())
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${vcfEsc(last)};${vcfEsc(parts.join(' '))};;;`,
    `FN:${vcfEsc(p.name)}`,
    `TITLE:${vcfEsc(p.role)}`,
    `EMAIL;TYPE=INTERNET:${p.email}`,
    `TEL;TYPE=CELL:+${intlPhone(p)}`,
    `ADR;TYPE=WORK:;;;${vcfEsc(city)};;;${vcfEsc(country)}`,
    `URL:${p.behance}`,
    `NOTE:${vcfEsc(p.summary)}`,
    'END:VCARD',
    '',
  ].join('\r\n')
}

const siteMeta = (rawUrl: string): Plugin => {
  const url = rawUrl.replace(/\/$/, '')
  return {
    name: 'site-meta',
    configureServer(server) {
      server.middlewares.use('/contact.vcf', (_req, res) => {
        res.setHeader('Content-Type', 'text/vcard; charset=utf-8')
        res.end(vcard(readProfile()))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'contact.vcf', source: vcard(readProfile()) })
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => {
        const p = readProfile()
        const jsonLd = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: p.name,
          jobTitle: p.role,
          email: `mailto:${p.email}`,
          telephone: `+${intlPhone(p)}`,
          address: { '@type': 'PostalAddress', addressLocality: p.location.split(',')[0].trim() },
          sameAs: [p.behance],
        })
        return {
          html: html
            .replaceAll('__SITE_URL__', url)
            .replaceAll('__TITLE__', esc(`${p.name} · ${p.role}`))
            .replaceAll('__NAME__', esc(p.name))
            .replaceAll('__DESCRIPTION__', esc(p.summary))
            .replace('__JSON_LD__', jsonLd.replace(/</g, '\\u003c')),
          tags: url ? [{ tag: 'link', attrs: { rel: 'canonical', href: `${url}/` }, injectTo: 'head' }] : [],
        }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), siteMeta(env.VITE_SITE_URL ?? '')],
  }
})
