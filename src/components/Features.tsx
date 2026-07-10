export default function Features() {
  return (
    <div className="w-full border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10">
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center justify-between text-sm">
        {/* Feature 1 */}
        <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
          <svg
            className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21 16-9 5-9-5M21 12l-9 5-9-5M12 3v18M2 17l10 5 10-5M2 12l10 5 10-5M2 7l10 5 10-5M12 3 2 7l10 4 10-4Z" />
          </svg>
          <span className="font-medium">Built with Next.js, React + Framer Motion.</span>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
          <svg
            className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="font-medium">Direct source styling, pure Tailwind CSS.</span>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
          <svg
            className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
            <line x1="16" y1="8" x2="2" y2="22" />
            <line x1="17.5" y1="15" x2="9" y2="15" />
          </svg>
          <span className="font-medium">No setup, no lock-in.</span>
        </div>
      </section>
    </div>
  );
}
