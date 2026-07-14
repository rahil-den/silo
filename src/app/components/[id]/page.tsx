"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { componentRegistry, ComponentSpec } from "@/components/registry";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ComponentPreview = ({ spec, propValues }: { spec: any; propValues: any }) => {
  return spec.render(propValues);
};

export default function ComponentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const spec = componentRegistry[id];

  if (!spec) {
    notFound();
  }

  // Initialize prop states based on defaults
  const [propValues, setPropValues] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    Object.entries(spec.props).forEach(([key, control]) => {
      defaults[key] = control.default;
    });
    return defaults;
  });
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  // Re-initialize state when component changes
  useEffect(() => {
    const defaults: Record<string, any> = {};
    Object.entries(spec.props).forEach(([key, control]) => {
      defaults[key] = control.default;
    });
    setPropValues(defaults);
    setActiveTab("preview");
    setCopied(false);
  }, [id, spec]);

  const handlePropChange = (key: string, value: any) => {
    setPropValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCopy = () => {
    const code = spec.getCode(propValues);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group all components for the sidebar navigation
  const sidebarGroups = Object.values(componentRegistry).reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, ComponentSpec[]>);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-60 shrink-0 space-y-6 lg:border-r lg:border-zinc-100 lg:dark:border-zinc-900 lg:pr-6">
          <div className="space-y-1">
            <Link
              href="/components"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1"
            >
              ← Back to shelf
            </Link>
            <h3 className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50 pt-2">
              Components
            </h3>
          </div>

          <nav className="space-y-6">
            {Object.entries(sidebarGroups).map(([groupName, items]) => (
              <div key={groupName} className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {groupName}
                </h4>
                <ul className="space-y-1">
                  {items.map((item) => {
                    const isActive = item.id === id;
                    return (
                      <li key={item.id}>
                        <Link
                          href={`/components/${item.id}`}
                          className={`block px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            isActive
                              ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 font-semibold"
                              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Center / Right Content Panel */}
        <section className="flex-1 min-w-0 space-y-10">
          
          {/* Header */}
          <div className="space-y-2 pb-6 border-b border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 rounded-sm">
                {spec.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {spec.name}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {spec.description}
            </p>
          </div>

          {/* Interactive Workspace (Playground) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Visual Canvas + Code Viewer */}
            <div className="xl:col-span-2 space-y-4">
              
              {/* Tab Selector */}
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                        : "text-zinc-500 hover:text-zinc-955 dark:hover:text-zinc-200"
                    }`}
                  >
                    Interactive Preview
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                      activeTab === "code"
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                        : "text-zinc-500 hover:text-zinc-955 dark:hover:text-zinc-200"
                    }`}
                  >
                    JSX Code
                  </button>
                </div>

                {activeTab === "code" && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer shadow-3xs"
                  >
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                )}
              </div>

              {/* Display Area */}
              {activeTab === "preview" ? (
                <div className="w-full min-h-[360px] bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                  <div className="relative z-10 w-full flex items-center justify-center">
                    <ComponentPreview spec={spec} propValues={propValues} />
                  </div>
                </div>
              ) : (
                <div className="relative w-full rounded-2xl border border-zinc-200/60 dark:border-zinc-900 overflow-hidden">
                  <pre className="p-5 text-xs font-mono bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 overflow-x-auto leading-relaxed max-h-[360px]">
                    <code>{spec.getCode(propValues)}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Customizer Props Panel */}
            <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900 rounded-2xl space-y-5 h-fit">
              <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Customizer
              </h3>
              
              <div className="space-y-4">
                {Object.entries(spec.props).map(([key, control]) => (
                  <div key={key} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {key}
                      </label>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {control.type}
                      </span>
                    </div>

                    {/* Boolean control */}
                    {control.type === "boolean" && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!propValues[key]}
                          onChange={(e) => handlePropChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-zinc-900 dark:peer-checked:bg-zinc-100" />
                      </label>
                    )}

                    {/* Text Control */}
                    {control.type === "text" && (
                      <input
                        type="text"
                        value={propValues[key] || ""}
                        onChange={(e) => handlePropChange(key, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-hidden text-zinc-800 dark:text-zinc-200 focus:border-zinc-950 dark:focus:border-zinc-50"
                      />
                    )}

                    {/* Select Control */}
                    {control.type === "select" && control.options && (
                      <select
                        value={propValues[key] || control.default}
                        onChange={(e) => handlePropChange(key, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-hidden text-zinc-800 dark:text-zinc-200 focus:border-zinc-950 dark:focus:border-zinc-50"
                      >
                        {control.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      {control.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* API Table Specification */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              API Reference
            </h3>
            
            <div className="overflow-x-auto border border-zinc-200/60 dark:border-zinc-900 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/60 dark:border-zinc-900">
                    <th className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">Prop</th>
                    <th className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">Type</th>
                    <th className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">Default</th>
                    <th className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-900">
                  {Object.entries(spec.props).map(([name, control]) => (
                    <tr key={name} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                      <td className="p-4 font-mono font-semibold text-indigo-600 dark:text-indigo-400">{name}</td>
                      <td className="p-4 font-mono text-zinc-500 dark:text-zinc-400">{control.type}</td>
                      <td className="p-4 font-mono text-zinc-500 dark:text-zinc-400">{String(control.default)}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-300 leading-relaxed">{control.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inside the Design Learning Panel */}
          {spec.designBreakdown && (
            <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-900">
              <div className="space-y-1">
                <p className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  // Design System Lessons
                </p>
                <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Inside the Design
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Visual Hierarchy
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {spec.designBreakdown.hierarchy}
                  </p>
                </div>

                <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Spacing & Padding
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {spec.designBreakdown.spacing}
                  </p>
                </div>

                <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Typography Choices
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {spec.designBreakdown.typography}
                  </p>
                </div>

                <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Motion & Micro-interactions
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {spec.designBreakdown.motion}
                  </p>
                </div>
              </div>
            </div>
          )}

        </section>

      </main>

      <Footer />
    </div>
  );
}
