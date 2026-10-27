// Edited through /admin (content/services.json).
import data from '../../content/services.json'

export type Service = {
  id: string
  index: string
  title: string
  description: string
  items: string[]
  // Controls the card's footprint in the bento grid.
  size: 'wide' | 'tall' | 'regular'
  note?: string
}

export const services = data.items.map((s, i) => ({
  ...s,
  index: String(i + 1).padStart(2, '0'),
})) as Service[]
