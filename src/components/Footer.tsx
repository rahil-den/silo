import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 dark:bg-black dark:border-t dark:border-zinc-900 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            Silo
          </Link>
          <p className="text-xs font-mono text-zinc-500">
            // stored, ready, already done
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href="https://github.com/rahil-den/silo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg
              className="w-4.5 h-4.5"
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
            GitHub
          </a>
          <span className="text-zinc-700 select-none">•</span>
          <span>Open source, MIT.</span>
        </div>
      </div>
    </footer>
  );
}
