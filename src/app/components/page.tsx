"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { componentRegistry } from "@/components/registry";

const ComponentPreview = ({ item, defaultProps }: { item: any; defaultProps: any }) => {
  return item.render(defaultProps);
};

export default function ComponentsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Components" },
    { id: "elements", name: "Elements" },
    { id: "navigation", name: "Navigation" },
    { id: "feedback", name: "Feedback" },
    { id: "layouts", name: "Layouts" },
    { id: "templates", name: "Templates" },
  ];

  const items = Object.values(componentRegistry).filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-8 py-12 space-y-10">
        {/* Header section */}
        <div className="space-y-4 max-w-2xl">
          <p className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            // Component Shelf
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Interactive Documentation
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Browse our catalog of micro-components and full layouts. Fully interactive, responsive, and ready to be integrated into your workspace.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100/80 dark:bg-zinc-900/60 rounded-xl border border-zinc-200/40 dark:border-zinc-800/60 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  category === cat.id
                    ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xs focus-within:border-zinc-950 dark:focus-within:border-zinc-50 transition-colors">
            <svg
              className="w-4 h-4 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs outline-hidden text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600"
            />
          </div>
        </div>

        {/* Components Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              // Gather default props
              const defaultProps: Record<string, any> = {};
              Object.entries(item.props).forEach(([key, val]) => {
                defaultProps[key] = val.default;
              });

              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-3xs transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-800 hover:shadow-md"
                >
                  {/* Live Render Canvas */}
                  <div className="relative aspect-[4/3] w-full bg-zinc-50/50 dark:bg-zinc-900/10 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-center overflow-hidden p-6">
                    <ComponentPreview item={item} defaultProps={defaultProps} />
                    
                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-zinc-950/2 dark:bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link
                        href={`/components/${item.id}`}
                        className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-white border border-zinc-200 rounded-xl shadow-md hover:bg-zinc-50 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800 translate-y-2 group-hover:translate-y-0 duration-300"
                      >
                        Open Playground
                      </Link>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 rounded-sm">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <Link
                        href={`/components/${item.id}`}
                        className="text-xs font-semibold text-zinc-900 dark:text-zinc-300 flex items-center gap-1 group-hover:underline"
                      >
                        Interactive specs
                        <span className="inline-block transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
            <svg
              className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-semibold text-zinc-500">No components matched your filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
