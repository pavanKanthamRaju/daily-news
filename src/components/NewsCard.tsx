import { motion, type Variants } from 'framer-motion'
import type { NewsArticle } from '../types'
import { formatRelativeTime } from '../lib/format'

interface NewsCardProps {
  article: NewsArticle
  index: number
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.21, 0.5, 0.35, 1] as const,
    },
  }),
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const initial = (article.source || 'N').charAt(0).toUpperCase()

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-brand-400/40 hover:bg-white/[0.06] sm:p-6"
    >
      {/* glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-500/10 via-transparent to-fuchsia-500/10" />
      </div>

      <div className="relative flex gap-4 sm:gap-5">
        <div className="flex shrink-0 flex-col items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/80 to-fuchsia-500/80 text-lg font-bold text-white shadow-inner">
            {initial}
          </span>
          <span className="mt-3 text-2xl font-black leading-none text-white/10 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-400">
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-brand-200">
              {article.source}
            </span>
            {article.publishedAt && (
              <>
                <span className="text-slate-600">·</span>
                <span>{formatRelativeTime(article.publishedAt)}</span>
              </>
            )}
          </div>

          <h2 className="text-lg font-semibold leading-snug text-slate-100 transition-colors group-hover:text-white sm:text-xl">
            {article.title}
          </h2>

          {article.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
              {article.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Read story
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
            className="hidden h-24 w-24 shrink-0 rounded-xl object-cover sm:block"
          />
        )}
      </div>
    </motion.a>
  )
}
