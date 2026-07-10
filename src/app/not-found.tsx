import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content Column */}
        <div className="space-y-8 max-w-lg">
          <div className="space-y-4">
            <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm tracking-tight">
              // page not found
            </p>
            <h1 className="text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 select-none">
              404
            </h1>
            <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Looks like you&apos;re off track.
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold shadow-xs transition-colors dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 text-sm"
            >
              Go Home
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
            <Link
              href="/components"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-semibold transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 text-sm"
            >
              Browse Components
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="relative w-full aspect-square flex items-center justify-center select-none max-w-lg mx-auto overflow-visible">
          {/* Black Hole / Silo Opening */}
          <div className="absolute w-[360px] h-[90px] bg-zinc-950/95 dark:bg-zinc-900/50 rounded-full transform rotate-12 bottom-[15%] left-[10%] shadow-inner border border-zinc-800/10 dark:border-zinc-800/30 flex items-center justify-center" />

          {/* Falling Browser Window */}
          <div className="absolute w-[280px] sm:w-[320px] aspect-[4/3] bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-xl shadow-2xl transform -rotate-12 translate-x-4 -translate-y-4 bottom-[20%] z-20 overflow-hidden flex flex-col">
            {/* Window bar */}
            <div className="h-7 border-b border-zinc-900 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
            </div>
            {/* Window content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-2">
              <span className="text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                404
              </span>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                Nothing to see here...
              </span>
              {/* Sad face outline */}
              <svg
                className="w-8 h-8 text-zinc-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
          </div>

          {/* Traffic Cone */}
          <div className="absolute left-[8%] bottom-[16%] z-30 transform -rotate-6">
            <svg
              className="w-20 h-28 drop-shadow-md"
              viewBox="0 0 100 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Base */}
              <path
                d="M5 125 L95 125 L85 135 L15 135 Z"
                fill="#18181b"
                stroke="#18181b"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Orange cone body */}
              <path d="M35 15 L65 15 L85 125 L15 125 Z" fill="#f97316" />
              {/* White stripe */}
              <path d="M42 45 L58 45 L64 70 L36 70 Z" fill="#ffffff" />
              {/* Black detail stripes */}
              <path d="M45 15 L55 15 L56 25 L44 25 Z" fill="#18181b" />
              <path d="M39 90 L61 90 L63 100 L37 100 Z" fill="#18181b" />
            </svg>
          </div>

          {/* Signboard */}
          <div className="absolute right-[5%] bottom-[14%] z-30 transform rotate-3 flex flex-col items-center">
            {/* The sign body */}
            <div className="w-28 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-700 rounded-lg p-3 shadow-md space-y-1.5 text-center flex flex-col items-center justify-center">
              <p className="text-[10px] font-bold leading-tight text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Let&apos;s get you back on track.
              </p>
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            {/* Stand/legs */}
            <div className="flex justify-between w-20 h-4 -mt-[2px] px-2">
              <div className="w-1.5 h-full bg-zinc-900 dark:bg-zinc-700" />
              <div className="w-1.5 h-full bg-zinc-900 dark:bg-zinc-700" />
            </div>
          </div>

          {/* Sketchy elements (deco shapes: ?! bubble, +, circles, paths) */}
          {/* ?! speech bubble */}
          <div className="absolute top-[20%] left-[45%] z-40 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 font-bold px-2 py-1 rounded-lg text-sm rotate-12 shadow-md">
            ?!
          </div>

          {/* Floating plus signs and circles */}
          <span className="absolute top-[30%] right-[10%] text-zinc-400 font-light text-2xl select-none">
            +
          </span>
          <span className="absolute bottom-[20%] left-[40%] text-zinc-400 font-light text-2xl select-none">
            +
          </span>
          <div className="absolute top-[38%] right-[18%] w-3 h-3 rounded-full border border-zinc-400" />
          <div className="absolute bottom-[22%] right-[25%] w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
        </div>
      </main>
    </div>
  );
}
