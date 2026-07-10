import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-16 flex flex-col items-start justify-center">
      <div className="max-w-3xl space-y-6">
        <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm tracking-tight">
          // a library of stored components
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
          Everything here is
          <br />
          already done.
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          Silo stores working components so you don&apos;t rebuild them. Browse, preview, ship.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            href="/components"
            className="flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-sm transition-colors dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 text-sm"
          >
            Browse Components
          </Link>
          <a
            href="https://github.com/rahil-den/silo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-medium transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
