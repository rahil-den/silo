"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { componentRegistry } from "@/components/registry";

const BlockPreview = ({ spec, props }: { spec: any; props: any }) => {
  return spec.render(props);
};

interface StackItem {
  id: string; // unique item instance id
  componentId: string; // references componentRegistry id
  props: Record<string, any>;
}

export default function TemplatesBuilderPage() {
  // Initial stack starts with a Hero and Feature Grid
  const [stack, setStack] = useState<StackItem[]>([
    {
      id: "hero-1",
      componentId: "heroSection",
      props: { ...getDefaultProps("heroSection") },
    },
    {
      id: "features-1",
      componentId: "featureSection",
      props: { ...getDefaultProps("featureSection") },
    },
  ]);

  const [activeItemId, setActiveItemId] = useState<string | null>("hero-1");
  const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");
  const [copied, setCopied] = useState(false);

  function getDefaultProps(componentId: string) {
    const spec = componentRegistry[componentId];
    const props: Record<string, any> = {};
    if (spec) {
      Object.entries(spec.props).forEach(([key, control]) => {
        props[key] = control.default;
      });
    }
    return props;
  }

  const addBlock = (componentId: string) => {
    const newId = `${componentId}-${Date.now()}`;
    const newItem: StackItem = {
      id: newId,
      componentId,
      props: getDefaultProps(componentId),
    };
    setStack((prev) => [...prev, newItem]);
    setActiveItemId(newId);
  };

  const removeBlock = (id: string) => {
    setStack((prev) => prev.filter((item) => item.id !== id));
    if (activeItemId === id) {
      setActiveItemId(null);
    }
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newStack = [...stack];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newStack.length) return;
    
    // Swap
    const temp = newStack[index];
    newStack[index] = newStack[targetIndex];
    newStack[targetIndex] = temp;
    setStack(newStack);
  };

  const updateBlockProp = (itemId: string, propKey: string, val: any) => {
    setStack((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            props: { ...item.props, [propKey]: val },
          };
        }
        return item;
      })
    );
  };

  const getAssembledCode = () => {
    const imports = new Set<string>(["import React from 'react';"]);
    
    const bodyCode = stack
      .map((item, idx) => {
        const spec = componentRegistry[item.componentId];
        if (!spec) return "";
        
        // Custom name based on index to avoid component namespace collision if needed, 
        // but for copy/paste we'll just stack the direct JSX code.
        const rawCode = spec.getCode(item.props);
        
        // Remove standard boilerplate imports from section codes
        const codeLines = rawCode
          .split("\n")
          .filter((line) => !line.startsWith("import"))
          .filter((line) => !line.includes("export default"));
        
        return `  {/* Section ${idx + 1}: ${spec.name} */}\n  ${codeLines.join("\n  ")}`;
      })
      .join("\n\n");

    return `import React from 'react';

export default function AssembledLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
${bodyCode}
    </div>
  );
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getAssembledCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeItem = stack.find((item) => item.id === activeItemId);
  const activeSpec = activeItem ? componentRegistry[activeItem.componentId] : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 md:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Control Column: Add Sections & Layout Order */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Landing Page Builder
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Assemble sections, refine text values, and copy clean code.
            </p>
          </div>

          {/* Add Sections shelf */}
          <div className="space-y-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/50 dark:border-zinc-900 rounded-xl">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Add Sections
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {Object.values(componentRegistry)
                .filter((c) => c.category === "templates" || c.category === "layouts" || c.id === "tabs")
                .map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => addBlock(comp.id)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-2xs transition-all text-left cursor-pointer"
                  >
                    <span>{comp.name}</span>
                    <span className="text-zinc-400 font-normal">+ Add</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Active Layout Stack */}
          <div className="space-y-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/50 dark:border-zinc-900 rounded-xl">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Layout Stack
            </h3>
            {stack.length > 0 ? (
              <div className="space-y-2">
                {stack.map((item, idx) => {
                  const spec = componentRegistry[item.componentId];
                  const isActive = item.id === activeItemId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveItemId(item.id)}
                      className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950"
                          : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold leading-none">{spec?.name || item.componentId}</p>
                        <p className={`text-[10px] ${isActive ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-400"}`}>
                          Section #{idx + 1}
                        </p>
                      </div>
                      
                      {/* Controller Buttons */}
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(idx, "up");
                          }}
                          disabled={idx === 0}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md disabled:opacity-30 cursor-pointer"
                        >
                          ▲
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(idx, "down");
                          }}
                          disabled={idx === stack.length - 1}
                          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md disabled:opacity-30 cursor-pointer"
                        >
                          ▼
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBlock(item.id);
                          }}
                          className="p-1 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-md cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 text-center py-4">No sections added yet.</p>
            )}
          </div>
        </aside>

        {/* Center Canvas / Preview Grid */}
        <section className="flex-1 min-w-0 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("visual")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                  activeTab === "visual"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
                }`}
              >
                Visual Sandbox
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                  activeTab === "code"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
                }`}
              >
                Assembled JSX
              </button>
            </div>

            {activeTab === "code" && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer shadow-3xs"
              >
                {copied ? "Copied!" : "Copy Page Code"}
              </button>
            )}
          </div>

          {activeTab === "visual" ? (
            <div className="border border-zinc-200/60 dark:border-zinc-900 rounded-2xl overflow-hidden bg-zinc-50/20 p-6 space-y-12 min-h-[600px] max-h-[85vh] overflow-y-auto">
              {stack.length > 0 ? (
                stack.map((item) => {
                  const spec = componentRegistry[item.componentId];
                  if (!spec) return null;
                  const isSelected = item.id === activeItemId;
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveItemId(item.id)}
                      className={`relative rounded-2xl group transition-all duration-300 ${
                        isSelected
                          ? "ring-2 ring-indigo-500 ring-offset-4 dark:ring-offset-zinc-950"
                          : "hover:ring-1 hover:ring-zinc-300 dark:hover:ring-zinc-800"
                      }`}
                    >
                      {/* Section label */}
                      <div className="absolute top-2 left-2 z-20 px-2 py-0.5 text-[9px] font-bold bg-zinc-900/80 backdrop-blur-xs text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pointer-events-none">
                        <span>{spec.name}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                      </div>
                      
                      <BlockPreview spec={spec} props={item.props} />
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-zinc-400 space-y-2">
                  <span className="text-4xl">🎛️</span>
                  <p className="text-xs font-semibold">Your sandbox is empty. Add a Hero to start building.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full rounded-2xl border border-zinc-200/60 dark:border-zinc-900 overflow-hidden">
              <pre className="p-5 text-xs font-mono bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 overflow-x-auto leading-relaxed max-h-[80vh]">
                <code>{getAssembledCode()}</code>
              </pre>
            </div>
          )}
        </section>

        {/* Right Column: Customizer Props Panel for Selected Block */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900 rounded-xl space-y-5 h-fit">
            <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Section Options
            </h3>
            
            {activeItem && activeSpec ? (
              <div className="space-y-4">
                <div className="pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{activeSpec.name}</p>
                  <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">{activeSpec.description}</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(activeSpec.props).map(([key, control]) => (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          {key}
                        </label>
                        <span className="text-[9px] font-mono text-zinc-400">
                          {control.type}
                        </span>
                      </div>

                      {/* Boolean control */}
                      {control.type === "boolean" && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!activeItem.props[key]}
                            onChange={(e) => updateBlockProp(activeItem.id, key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-zinc-900 dark:peer-checked:bg-zinc-100" />
                        </label>
                      )}

                      {/* Text Control */}
                      {control.type === "text" && (
                        <input
                          type="text"
                          value={activeItem.props[key] || ""}
                          onChange={(e) => updateBlockProp(activeItem.id, key, e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-hidden text-zinc-800 dark:text-zinc-200 focus:border-zinc-950 dark:focus:border-zinc-50"
                        />
                      )}

                      {/* Select Control */}
                      {control.type === "select" && control.options && (
                        <select
                          value={activeItem.props[key] || control.default}
                          onChange={(e) => updateBlockProp(activeItem.id, key, e.target.value)}
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
            ) : (
              <p className="text-xs text-zinc-400 text-center py-6">Select a section in the Layout Stack or Visual Sandbox to configure props.</p>
            )}
          </div>
        </aside>

      </main>

      <Footer />
    </div>
  );
}
