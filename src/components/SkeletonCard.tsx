export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="shimmer relative flex gap-4 overflow-hidden sm:gap-5">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-white/10" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-28 rounded bg-white/10" />
          <div className="h-5 w-3/4 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/5" />
          <div className="h-4 w-2/3 rounded bg-white/5" />
        </div>
      </div>
    </div>
  )
}
