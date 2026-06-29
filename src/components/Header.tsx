import { motion } from 'framer-motion'
import { todayLabel } from '../lib/format'

interface HeaderProps {
  providerLabel: string
  loading: boolean
  onRefresh: () => void
}

export default function Header({ providerLabel, loading, onRefresh }: HeaderProps) {
  return (
    <header className="relative mx-auto max-w-3xl px-5 pt-14 text-center sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-200 backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Live · {todayLabel()}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-balance text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl"
      >
        Your <span className="text-gradient">Daily News</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mx-auto mt-4 max-w-md text-pretty text-base text-slate-400 sm:text-lg"
      >
        The latest 5 stories, beautifully delivered. Powered by {providerLabel}.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRefresh}
        disabled={loading}
        className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshIcon spinning={loading} />
        {loading ? 'Fetching…' : 'Latest News'}
      </motion.button>
    </header>
  )
}

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform group-hover:rotate-90 ${
        spinning ? 'animate-spin' : ''
      }`}
    >
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  )
}
