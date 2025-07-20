import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://seloraa.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/features', '/pricing', '/about', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  )

  return routes
}
