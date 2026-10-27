// Edited through /admin (content/projects.json). Projects come from https://www.behance.net/w4g.
// Thumbnails load from Behance's CDN or from /uploads. If one fails, a styled fallback cover is shown.
import data from '../../content/projects.json'

export type Project = {
  title: string
  client: string
  category: string
  description: string
  url: string
  image: string
  team?: boolean
  featured: boolean
}

export const projects = data.items as Project[]
