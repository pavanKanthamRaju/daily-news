export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#05060f]" />
      <div className="aurora-blob absolute -top-32 -left-24 h-[38rem] w-[38rem] rounded-full bg-indigo-600/30 blur-[120px]" />
      <div
        className="aurora-blob absolute top-1/3 -right-24 h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/20 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="aurora-blob absolute -bottom-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-sky-500/20 blur-[120px]"
        style={{ animationDelay: '-12s' }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}
