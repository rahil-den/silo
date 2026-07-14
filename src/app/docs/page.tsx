"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-8 py-10 flex flex-col lg:flex-row gap-10">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-56 shrink-0 space-y-6 lg:border-r lg:border-zinc-100 lg:dark:border-zinc-900 lg:pr-6">
          <div className="space-y-1">
            <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Getting Started
            </h3>
            <ul className="space-y-1 pt-2">
              <li>
                <a href="#introduction" className="block py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  Introduction
                </a>
              </li>
              <li>
                <a href="#philosophy" className="block py-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#installation" className="block py-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                  Installation
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Concepts
            </h3>
            <ul className="space-y-1 pt-2">
              <li>
                <a href="#copy-paste" className="block py-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                  Copy-Paste Flow
                </a>
              </li>
              <li>
                <a href="#tailwind" className="block py-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                  Tailwind CSS v4
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Documentation Content */}
        <section className="flex-1 min-w-0 max-w-3xl space-y-12">
          
          {/* Introduction */}
          <div id="introduction" className="space-y-4 scroll-mt-20">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Introduction
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Welcome to the Silo documentation. Silo is a highly curated repository of interactive React components designed with modern aesthetics and maximum performance in mind.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike traditional component libraries that pack heavy node package bundles, Silo components are meant to be copied, pasted, and customized directly inside your application code workspace.
            </p>
          </div>

          {/* Philosophy */}
          <div id="philosophy" className="space-y-4 scroll-mt-20 border-t border-zinc-100 dark:border-zinc-900 pt-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Philosophy
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our guiding concept is simple: <strong>Stored, ready, already done.</strong>
            </p>
            <ul className="list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                <strong>No Bloat:</strong> You only import code you actually use.
              </li>
              <li>
                <strong>Total Control:</strong> Since the source code resides directly in your directory, you own 100% of the styling, state logic, and behaviour modifications.
              </li>
              <li>
                <strong>Aesthetic First:</strong> Hand-crafted variables, soft glow effects, high contrast dark modes, and subtle spring transitions by default.
              </li>
            </ul>
          </div>

          {/* Installation */}
          <div id="installation" className="space-y-4 scroll-mt-20 border-t border-zinc-100 dark:border-zinc-900 pt-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Installation
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Getting started is straightforward. All Silo components rely on Tailwind CSS v4 and standard React.
            </p>
            
            <div className="space-y-3">
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                1. Ensure Tailwind CSS v4 is initialized
              </p>
              <pre className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 rounded-xl text-xs font-mono overflow-x-auto text-zinc-700 dark:text-zinc-300">
                <code>{`/* In your app/globals.css */
@import "tailwindcss";`}</code>
              </pre>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                2. Install React Types (if using TypeScript)
              </p>
              <pre className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 rounded-xl text-xs font-mono overflow-x-auto text-zinc-700 dark:text-zinc-300">
                <code>{`pnpm add -D @types/react @types/react-dom`}</code>
              </pre>
            </div>
          </div>

          {/* Copy-Paste Flow */}
          <div id="copy-paste" className="space-y-4 scroll-mt-20 border-t border-zinc-100 dark:border-zinc-900 pt-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Copy-Paste Flow
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Using components is as simple as clicking **Copy Code** in the playground:
            </p>
            <ol className="list-decimal pl-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>
                Navigate to the <Link href="/components" className="text-indigo-600 dark:text-indigo-400 hover:underline">Components shelf</Link>.
              </li>
              <li>
                Click on the element you wish to configure (e.g. Button).
              </li>
              <li>
                Use the **Customizer** panel on the right side to toggle variant classes live.
              </li>
              <li>
                Click the **JSX Code** tab, copy the clean React component markup, and save it inside your own codebase.
              </li>
            </ol>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
