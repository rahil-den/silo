import Link from "next/link";

export default function Showcase() {
  const items = [
    {
      id: "01",
      name: "Button",
      preview: (
        <button className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 rounded-lg shadow-xs hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800 cursor-default">
          Click me
        </button>
      ),
    },
    {
      id: "02",
      name: "Dialog",
      preview: (
        <div className="w-28 p-2.5 bg-white border border-zinc-200 rounded-xl shadow-md space-y-1.5 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="h-2 w-12 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-1.5 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>
      ),
    },
    {
      id: "03",
      name: "Tabs",
      preview: (
        <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900/80 rounded-lg border border-zinc-200/50 dark:border-zinc-800">
          <span className="px-2.5 py-1 text-[10px] font-semibold text-zinc-900 bg-white rounded-md shadow-xs dark:bg-zinc-800 dark:text-zinc-100">
            Tab 1
          </span>
          <span className="px-2.5 py-1 text-[10px] font-medium text-zinc-500 rounded-md">
            Tab 2
          </span>
        </div>
      ),
    },
    {
      id: "04",
      name: "Tooltip",
      preview: (
        <div className="relative flex flex-col items-center">
          <span className="px-2 py-1 text-[9px] font-bold text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 rounded-md shadow-xs relative z-10">
            Copied!
          </span>
          <div className="w-1.5 h-1.5 bg-zinc-900 dark:bg-zinc-50 rotate-45 -mt-0.5" />
        </div>
      ),
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-20 space-y-12">
      <div className="space-y-3">
        <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm tracking-tight">
          // in the silo
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          A small set, kept sharp.
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group space-y-3">
            <div className="aspect-[4/3] w-full bg-zinc-100/60 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-800/40 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
              {item.preview}
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm px-1">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {item.name}
              </span>
              <span className="font-mono text-zinc-400 dark:text-zinc-500">
                {item.id}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Link
          href="/components"
          className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300 transition-colors group"
        >
          See all components{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
