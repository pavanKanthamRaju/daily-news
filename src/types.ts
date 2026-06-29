export interface NewsArticle {
  id: string
  title: string
  url: string
  source: string
  author: string | null
  publishedAt: string | null
  description: string | null
  imageUrl: string | null
}

export type NewsProviderName = 'hackernews' | 'newsapi' | 'gnews'
