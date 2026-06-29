import type { NewsArticle, NewsProviderName } from '../types'

export const ARTICLE_COUNT = 5

/**
 * Resolve which provider to use based on the API keys available at build time.
 * - VITE_GNEWS_API_KEY  -> GNews (general news, browser-friendly CORS)
 * - VITE_NEWS_API_KEY   -> NewsAPI.org (general news; works on localhost)
 * - otherwise           -> Hacker News (free, no key required)
 */
export function resolveProvider(): NewsProviderName {
  if (import.meta.env.VITE_GNEWS_API_KEY) return 'gnews'
  if (import.meta.env.VITE_NEWS_API_KEY) return 'newsapi'
  return 'hackernews'
}

export const PROVIDER_LABELS: Record<NewsProviderName, string> = {
  hackernews: 'Hacker News',
  newsapi: 'NewsAPI',
  gnews: 'GNews',
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal })
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`)
  }
  return (await res.json()) as T
}

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'news'
  }
}

/* ------------------------------- Hacker News ------------------------------ */

interface HnItem {
  id: number
  title?: string
  url?: string
  by?: string
  time?: number
  score?: number
  descendants?: number
  text?: string
}

async function fetchHackerNews(
  count: number,
  signal?: AbortSignal,
): Promise<NewsArticle[]> {
  const ids = await fetchJson<number[]>(
    'https://hacker-news.firebaseio.com/v0/topstories.json',
    signal,
  )
  const items = await Promise.all(
    ids.slice(0, count).map((id) =>
      fetchJson<HnItem>(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        signal,
      ),
    ),
  )

  return items.map((item) => {
    const url = item.url ?? `https://news.ycombinator.com/item?id=${item.id}`
    const points = item.score ?? 0
    const comments = item.descendants ?? 0
    return {
      id: String(item.id),
      title: item.title ?? 'Untitled story',
      url,
      source: item.url ? hostFromUrl(item.url) : 'news.ycombinator.com',
      author: item.by ?? null,
      publishedAt: item.time ? new Date(item.time * 1000).toISOString() : null,
      description: `${points} points · ${comments} comments on Hacker News`,
      imageUrl: null,
    }
  })
}

/* --------------------------------- NewsAPI -------------------------------- */

interface NewsApiArticle {
  title: string
  url: string
  description: string | null
  author: string | null
  publishedAt: string | null
  urlToImage: string | null
  source: { name: string | null }
}

async function fetchNewsApi(
  count: number,
  signal?: AbortSignal,
): Promise<NewsArticle[]> {
  const key = import.meta.env.VITE_NEWS_API_KEY
  const country = import.meta.env.VITE_NEWS_API_COUNTRY ?? 'us'
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${count}&apiKey=${key}`
  const data = await fetchJson<{ articles: NewsApiArticle[] }>(url, signal)
  return data.articles.slice(0, count).map((a, i) => ({
    id: a.url || String(i),
    title: a.title,
    url: a.url,
    source: a.source.name ?? hostFromUrl(a.url),
    author: a.author,
    publishedAt: a.publishedAt,
    description: a.description,
    imageUrl: a.urlToImage,
  }))
}

/* ---------------------------------- GNews --------------------------------- */

interface GNewsArticle {
  title: string
  description: string | null
  url: string
  image: string | null
  publishedAt: string | null
  source: { name: string | null }
}

async function fetchGNews(
  count: number,
  signal?: AbortSignal,
): Promise<NewsArticle[]> {
  const key = import.meta.env.VITE_GNEWS_API_KEY
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&max=${count}&apikey=${key}`
  const data = await fetchJson<{ articles: GNewsArticle[] }>(url, signal)
  return data.articles.slice(0, count).map((a, i) => ({
    id: a.url || String(i),
    title: a.title,
    url: a.url,
    source: a.source.name ?? hostFromUrl(a.url),
    author: a.source.name ?? null,
    publishedAt: a.publishedAt,
    description: a.description,
    imageUrl: a.image,
  }))
}

/* --------------------------------- Public --------------------------------- */

export async function fetchLatestNews(
  count: number = ARTICLE_COUNT,
  signal?: AbortSignal,
): Promise<NewsArticle[]> {
  switch (resolveProvider()) {
    case 'gnews':
      return fetchGNews(count, signal)
    case 'newsapi':
      return fetchNewsApi(count, signal)
    default:
      return fetchHackerNews(count, signal)
  }
}
