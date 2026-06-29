import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AuroraBackground from './components/AuroraBackground'
import Header from './components/Header'
import NewsCard from './components/NewsCard'
import SkeletonCard from './components/SkeletonCard'
import ErrorState from './components/ErrorState'
import {
  ARTICLE_COUNT,
  PROVIDER_LABELS,
  fetchLatestNews,
  resolveProvider,
} from './services/news'
import type { NewsArticle } from './types'

const providerLabel = PROVIDER_LABELS[resolveProvider()]

export default function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const load = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    try {
      const data = await fetchLatestNews(ARTICLE_COUNT, controller.signal)
      if (controller.signal.aborted) return
      setArticles(data)
      setLastUpdated(new Date())
    } catch (err) {
      if (controller.signal.aborted) return
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while fetching the latest stories.',
      )
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [])

  // Fetch the latest news automatically whenever the app opens.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data fetch on mount
    load()
    return () => abortRef.current?.abort()
  }, [load])

  return (
    <div className="relative min-h-full">
      <AuroraBackground />

      <Header providerLabel={providerLabel} loading={loading} onRefresh={load} />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-12">
        {error ? (
          <ErrorState message={error} onRetry={load} />
        ) : (
          <ul className="space-y-4">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeletons"
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {Array.from({ length: ARTICLE_COUNT }).map((_, i) => (
                    <li key={i} className="list-none">
                      <SkeletonCard />
                    </li>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="articles" className="space-y-4">
                  {articles.map((article, i) => (
                    <li key={article.id} className="list-none">
                      <NewsCard article={article} index={i} />
                    </li>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ul>
        )}

        {lastUpdated && !loading && !error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-xs text-slate-500"
          >
            Updated{' '}
            {lastUpdated.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            · {providerLabel}
          </motion.p>
        )}
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-600">
        Built with React, Tailwind CSS &amp; Framer Motion
      </footer>
    </div>
  )
}
