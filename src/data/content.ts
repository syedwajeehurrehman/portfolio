// Edited through /admin (content/about.json and content/sections.json).
import aboutData from '../../content/about.json'
import sections from '../../content/sections.json'

export type Experience = { role: string; place: string; where?: string; years?: string }

export const portrait = aboutData.portrait
export const about = aboutData.paragraphs
export const experience = aboutData.experience as Experience[]
export const tools = aboutData.tools
export const approach = sections.approach.map((s, i) => ({ ...s, step: String(i + 1).padStart(2, '0') }))
export const reasons = sections.reasons
export const projectTypes = sections.projectTypes
