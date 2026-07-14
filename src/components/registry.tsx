"use client";

import React, { useState, useEffect } from "react";

export interface PropControl {
  type: "text" | "boolean" | "select";
  default: any;
  options?: string[];
  description: string;
}

export interface DesignBreakdown {
  hierarchy: string;
  spacing: string;
  typography: string;
  motion: string;
}

export interface ComponentSpec {
  id: string;
  name: string;
  category: "elements" | "feedback" | "navigation" | "layouts" | "templates";
  description: string;
  props: Record<string, PropControl>;
  render: (props: any) => React.ReactNode;
  getCode: (props: any) => string;
  designBreakdown: DesignBreakdown;
}

export const componentRegistry: Record<string, ComponentSpec> = {
  button: {
    id: "button",
    name: "Button",
    category: "elements",
    description: "A premium interactive button component with smooth transitions, custom focus outlines, and distinct variants.",
    props: {
      text: { type: "text", default: "Execute Command", description: "The button text label." },
      variant: {
        type: "select",
        options: ["primary", "secondary", "outline", "ghost", "glow"],
        default: "glow",
        description: "The visual style variant.",
      },
      size: {
        type: "select",
        options: ["sm", "md", "lg"],
        default: "md",
        description: "The button sizing configuration.",
      },
      disabled: { type: "boolean", default: false, description: "Whether the button is interactive." },
    },
    designBreakdown: {
      hierarchy: "The 'glow' variant uses a subtle gradient with a soft drop-shadow glow to act as a clear Call-To-Action (CTA). Secondary and ghost variants step down in visual weight to guide the eye.",
      spacing: "Symmetrical padding (e.g. px-4.5 py-2 for md) ensures proper target sizing matching modern touch guidelines (min 44x44px equivalent).",
      typography: "Semi-bold weighting (font-semibold) with tracking-tight maintains clean legibility and prevents text wraps.",
      motion: "Transition durations of 200ms with smooth curves ensure instant, satisfying micro-feedback upon hover or click actions.",
    },
    render: (props: any) => {
      const { text, variant, size, disabled } = props;
      const sizeClasses = {
        sm: "px-3 py-1.5 text-xs rounded-md",
        md: "px-4.5 py-2 text-sm rounded-lg",
        lg: "px-6 py-3 text-base rounded-xl",
      }[size as "sm" | "md" | "lg"] || "px-4.5 py-2 text-sm rounded-lg";

      const variantClasses = {
        primary: "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-950/20 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent shadow-xs",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-800/80 shadow-3xs",
        outline: "bg-transparent text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800",
        ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200",
        glow: "relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-95 shadow-glow-indigo transition-all duration-300 hover:scale-[1.01]",
      }[variant as "primary" | "secondary" | "outline" | "ghost" | "glow"] || "bg-zinc-900 text-white rounded-lg";

      return (
        <button
          disabled={disabled}
          className={`${sizeClasses} ${variantClasses} font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500`}
        >
          {text}
        </button>
      );
    },
    getCode: (props: any) => {
      const { text, variant, size, disabled } = props;
      const sizeClasses = {
        sm: "px-3 py-1.5 text-xs rounded-md",
        md: "px-4.5 py-2 text-sm rounded-lg",
        lg: "px-6 py-3 text-base rounded-xl",
      }[size as "sm" | "md" | "lg"];

      const variantClasses = {
        primary: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent shadow-xs",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-800/80 shadow-3xs",
        outline: "bg-transparent text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800",
        ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200",
        glow: "relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-95 shadow-glow-indigo transition-all hover:scale-[1.01]",
      }[variant as "primary" | "secondary" | "outline" | "ghost" | "glow"];

      return `<button
  ${disabled ? "disabled\n  " : ""}className="${sizeClasses} ${variantClasses} font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
>
  ${text}
</button>`;
    },
  },
  input: {
    id: "input",
    name: "Input",
    category: "elements",
    description: "A gorgeous form input field with a floating label animation, focus rings, and explicit validation states.",
    props: {
      label: { type: "text", default: "Database Hostname", description: "Label text display." },
      placeholder: { type: "text", default: "db.silo.internal", description: "Default input placeholder." },
      state: { type: "select", options: ["default", "success", "error"], default: "default", description: "Validation boundary state." },
      helperText: { type: "text", default: "Configure your internal silo route key.", description: "Description message below the input frame." },
      disabled: { type: "boolean", default: false, description: "Whether the field is disabled." },
    },
    designBreakdown: {
      hierarchy: "The typography of the label is small and semi-bold, creating a clear container roof. Error or success colors instantly transform the border and helper text properties.",
      spacing: "Generous vertical spacing (gap-1.5) ensures elements do not look compressed. 14px horizontal padding keeps text clear of border lines.",
      typography: "Helper text uses small size definitions (text-[11px]) to prevent competition with the primary form label.",
      motion: "Inputs utilize transition-all properties (200ms duration) so that active border colors fade in smoothly upon cursor focus.",
    },
    render: (props: any) => {
      const { label, placeholder, state, helperText, disabled } = props;

      const borderClass = {
        default: "border-zinc-200 focus-within:border-zinc-950 focus-within:ring-2 focus-within:ring-zinc-950/10 dark:border-zinc-800 dark:focus-within:border-zinc-50 dark:focus-within:ring-zinc-50/10",
        success: "border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 dark:border-emerald-600",
        error: "border-rose-500/80 focus-within:ring-2 focus-within:ring-rose-500/10 dark:border-rose-600",
      }[state as "default" | "success" | "error"];

      const labelColor = {
        default: "text-zinc-600 dark:text-zinc-400",
        success: "text-emerald-600 dark:text-emerald-400",
        error: "text-rose-600 dark:text-rose-400",
      }[state as "default" | "success" | "error"];

      return (
        <div className="w-full max-w-sm flex flex-col gap-1.5 p-6">
          <label className={`text-xs font-semibold tracking-tight ${labelColor}`}>{label}</label>
          <div className={`flex items-center px-3.5 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl transition-all duration-200 ${borderClass} ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
            <input
              type="text"
              disabled={disabled}
              placeholder={placeholder}
              className="w-full text-sm bg-transparent outline-hidden text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600"
            />
          </div>
          {helperText && (
            <p className={`text-[11px] ${state === "error" ? "text-rose-500" : state === "success" ? "text-emerald-500" : "text-zinc-400"} font-medium`}>
              {helperText}
            </p>
          )}
        </div>
      );
    },
    getCode: (props: any) => {
      const { label, placeholder, state, helperText, disabled } = props;

      const borderClass = {
        default: "border-zinc-200 focus-within:border-zinc-950 focus-within:ring-2 focus-within:ring-zinc-950/10 dark:border-zinc-800 dark:focus-within:border-zinc-50 dark:focus-within:ring-zinc-50/10",
        success: "border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 dark:border-emerald-600",
        error: "border-rose-500/80 focus-within:ring-2 focus-within:ring-rose-500/10 dark:border-rose-600",
      }[state as "default" | "success" | "error"];

      const labelColor = {
        default: "text-zinc-600 dark:text-zinc-400",
        success: "text-emerald-600 dark:text-emerald-400",
        error: "text-rose-600 dark:text-rose-400",
      }[state as "default" | "success" | "error"];

      return `import React from 'react';

export default function PolishedInputField() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-tight ${labelColor}">
        ${label}
      </label>
      <div className="flex items-center px-3.5 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl transition-all duration-200 ${borderClass} ${disabled ? "opacity-50 pointer-events-none" : ""}">
        <input
          type="text"
          disabled={${disabled}}
          placeholder="${placeholder}"
          className="w-full text-sm bg-transparent outline-hidden text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600"
        />
      </div>
      ${helperText ? `<p className="text-[11px] ${state === "error" ? "text-rose-500" : state === "success" ? "text-emerald-500" : "text-zinc-400"} font-medium">${helperText}</p>` : ""}
    </div>
  );
}`;
    },
  },
  card: {
    id: "card",
    name: "Card",
    category: "layouts",
    description: "A content card featuring clean borders, glassmorphic styles, or premium hover glow indicators.",
    props: {
      title: { type: "text", default: "Database Syncing", description: "Card title element." },
      description: { type: "text", default: "A cloud-based sandbox matching local workspace metadata schemas automatically.", description: "Detailed description body." },
      variant: { type: "select", options: ["flat", "glass", "glow"], default: "glow", description: "Visual border style." },
      tag: { type: "text", default: "Production", description: "Mini text label indicator." },
    },
    designBreakdown: {
      hierarchy: "The small tag pill creates a corner anchor. A subtle pulsing indicator dot next to it draws user interest without occupying space.",
      spacing: "Padded at 20px (p-5), ensuring optimal spacing that feels breathing and minimal.",
      typography: "Title text size uses medium weight (font-bold text-sm) contrasted with soft text-zinc-500 description layout.",
      motion: "Hover triggers transitions of borders, shadows, and opacity seamlessly over 300ms.",
    },
    render: (props: any) => {
      const { title, description, variant, tag } = props;

      const containerStyle = {
        flat: "bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800",
        glass: "bg-white/40 dark:bg-zinc-900/20 backdrop-blur-lg border border-white/20 dark:border-zinc-800/40 shadow-premium-sm",
        glow: "bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:border-indigo-500/50 hover:shadow-glow-indigo transition-all duration-300",
      }[variant as "flat" | "glass" | "glow"] || "bg-white border border-zinc-200";

      return (
        <div className="w-full max-w-sm p-6 flex justify-center">
          <div className={`w-full p-5 rounded-2xl ${containerStyle}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 rounded-md">
                {tag}
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{title}</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{description}</p>
            <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-5 overflow-hidden">
              <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
            </div>
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { title, description, variant, tag } = props;

      const containerStyle = {
        flat: "bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800",
        glass: "bg-white/40 dark:bg-zinc-900/20 backdrop-blur-lg border border-white/20 dark:border-zinc-800/40 shadow-premium-sm",
        glow: "bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:border-indigo-500/50 hover:shadow-glow-indigo transition-all duration-300",
      }[variant as "flat" | "glass" | "glow"];

      return `import React from 'react';

export default function PremiumCard() {
  return (
    <div className="w-full max-w-sm p-5 rounded-2xl ${containerStyle}">
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 rounded-md">
          ${tag}
        </span>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      
      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
        ${title}
      </h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
        ${description}
      </p>
      
      <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-5 overflow-hidden">
        <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
      </div>
    </div>
  );
}`;
    },
  },
  modal: {
    id: "modal",
    name: "Modal",
    category: "feedback",
    description: "An elegant modal component featuring overlay blur styling and fluid zoom entry animation.",
    props: {
      title: { type: "text", default: "Sync Configurations", description: "Modal title." },
      description: { type: "text", default: "Are you sure you want to write these settings into production database routes?", description: "Detailed description." },
      size: { type: "select", options: ["sm", "md", "lg"], default: "md", description: "Width sizing." },
      blurBackground: { type: "boolean", default: true, description: "Whether to apply a backdrop blur overlay." },
    },
    designBreakdown: {
      hierarchy: "The dialog card floats above an overlay mask. Contrast between the background backdrop and the card defines depth hierarchy.",
      spacing: "Internal padding of 24px (p-6) guarantees elements do not feel close to border boundaries. Primary actions sit on the right.",
      typography: "Title uses semi-bold structures (font-semibold text-base) paired with standard responsive descriptions.",
      motion: "Utilizes the design token `animate-zoom-in` (spring easing scale zoom-in) for card entrance, and `animate-fade-in` for the backdrop mask.",
    },
    render: (props: any) => {
      const { title, description, size, blurBackground } = props;
      const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
      }[size as "sm" | "md" | "lg"] || "max-w-md";

      return (
        <div className="relative w-full flex items-center justify-center p-6 min-h-[300px]">
          <div className={`absolute inset-0 bg-zinc-950/20 dark:bg-zinc-950/60 transition-all ${blurBackground ? "backdrop-blur-[2px]" : ""} rounded-xl`} />
          <div className={`relative z-10 w-full ${sizeClasses} bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-premium-lg rounded-2xl p-6 animate-zoom-in`}>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{description}</p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg cursor-pointer dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700/80">
                Cancel
              </button>
              <button className="px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg cursor-pointer dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                Confirm
              </button>
            </div>
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { title, description, size, blurBackground } = props;
      const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
      }[size as "sm" | "md" | "lg"];

      return `import React from 'react';

export default function PolishedModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/40 ${blurBackground ? "backdrop-blur-[2px]" : ""} animate-fade-in" 
      />
      
      {/* Card Content Frame */}
      <div className="relative z-10 w-full ${sizeClasses} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-premium-lg rounded-2xl p-6 animate-zoom-in">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ${title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          ${description}
        </p>
        
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg cursor-pointer dark:text-zinc-300 dark:bg-zinc-800"
          >
            Cancel
          </button>
          <button className="px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg cursor-pointer dark:bg-zinc-50 dark:text-zinc-900">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}`;
    },
  },
  tabs: {
    id: "tabs",
    name: "Tabs",
    category: "navigation",
    description: "Highly polished slider tabs with fluid animations and responsive layouts.",
    props: {
      variant: { type: "select", options: ["pills", "underline", "segment"], default: "segment", description: "Design style of the tabs container." },
      size: { type: "select", options: ["sm", "md"], default: "md", description: "Padding and height scale." },
      theme: { type: "select", options: ["dark", "light", "indigo"], default: "dark", description: "Active item theme highlights." },
    },
    designBreakdown: {
      hierarchy: "The active tab uses contrast changes (background offset or bottom border highlight) to signal priority.",
      spacing: "Symmetrical horizontal tabs with standard gaps (gap-1 or gap-1.5) maintain high alignment.",
      typography: "Typography remains medium weights (font-semibold) with text-xs/text-sm parameters to conserve display real estate.",
      motion: "Transitions of active tab indicators execute over 200ms with a clean ease curve.",
    },
    render: (props: any) => {
      const { variant, size, theme } = props;
      const sizeClasses = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm";
      const tabs = ["Overview", "Deployments", "Analytics", "Settings"];

      let containerClasses = "";
      let activeClasses = "";
      let inactiveClasses = "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200";

      if (variant === "segment") {
        containerClasses = "p-1 bg-zinc-100 dark:bg-zinc-900/60 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 flex gap-1";
        activeClasses = {
          dark: "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50",
          light: "bg-zinc-900 text-white shadow-xs dark:bg-zinc-50 dark:text-zinc-950",
          indigo: "bg-indigo-600 text-white shadow-xs",
        }[theme as "dark" | "light" | "indigo"] || "";
      } else if (variant === "pills") {
        containerClasses = "flex gap-1.5";
        activeClasses = {
          dark: "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 rounded-lg",
          light: "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-lg",
          indigo: "bg-indigo-600 text-white rounded-lg",
        }[theme as "dark" | "light" | "indigo"] || "";
      } else {
        containerClasses = "flex gap-4 border-b border-zinc-200 dark:border-zinc-800 w-full";
        activeClasses = {
          dark: "border-b-2 border-zinc-900 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50 -mb-[2px]",
          light: "border-b-2 border-zinc-500 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 -mb-[2px]",
          indigo: "border-b-2 border-indigo-600 text-indigo-600 -mb-[2px]",
        }[theme as "dark" | "light" | "indigo"] || "";
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 w-full">
          <div className={containerClasses}>
            {tabs.map((tab, idx) => (
              <span
                key={tab}
                className={`${sizeClasses} font-semibold transition-all duration-250 cursor-pointer ${
                  idx === 0 ? activeClasses : inactiveClasses
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { variant, size, theme } = props;
      const sizeClasses = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm";
      return `import React, { useState } from 'react';

export default function SlidableTabs() {
  const tabs = ["Overview", "Deployments", "Analytics", "Settings"];
  const [active, setActive] = useState("Overview");

  return (
    <div className="${
      variant === "segment"
        ? "p-1 bg-zinc-100 dark:bg-zinc-900/60 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 flex gap-1"
        : variant === "pills"
        ? "flex gap-1.5"
        : "flex gap-4 border-b border-zinc-200 dark:border-zinc-800 w-full"
    }">
      {tabs.map((tab) => {
        const isSel = active === tab;
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={\`\${isSel 
              ? "${
                variant === "segment"
                  ? theme === "indigo"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : theme === "light"
                    ? "bg-zinc-900 text-white shadow-xs dark:bg-zinc-50 dark:text-zinc-950"
                    : "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                  : variant === "pills"
                  ? theme === "indigo"
                    ? "bg-indigo-600 text-white rounded-lg"
                    : theme === "light"
                    ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-lg"
                    : "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 rounded-lg"
                  : theme === "indigo"
                  ? "border-b-2 border-indigo-600 text-indigo-600 -mb-[2px]"
                  : theme === "light"
                  ? "border-b-2 border-zinc-500 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 -mb-[2px]"
                  : "border-b-2 border-zinc-900 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50 -mb-[2px]"
              }"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            } font-semibold transition-all duration-200 ${sizeClasses} cursor-pointer\`}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}`;
    },
  },
  tooltip: {
    id: "tooltip",
    name: "Tooltip",
    category: "feedback",
    description: "An elegant micro-popup showing rich context when hovering over targets.",
    props: {
      content: { type: "text", default: "Copied secret API key!", description: "The tooltip content text." },
      position: { type: "select", options: ["top", "bottom", "left", "right"], default: "top", description: "Offset orientation." },
      theme: { type: "select", options: ["dark", "indigo", "glass"], default: "dark", description: "Style variables." },
    },
    designBreakdown: {
      hierarchy: "The tooltip floats near its anchor, ensuring primary attention remains on the element it describes.",
      spacing: "Small gaps (gap-2) prevent overlap with the anchor while maintaining proximity.",
      typography: "Mini font weights (font-semibold text-xs) keep the UI clean.",
      motion: "Uses transition effects to fade in smoothly, providing immediate visual feedback without layout shift.",
    },
    render: (props: any) => {
      const { content, position, theme } = props;

      const themeBubble = {
        dark: "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
        indigo: "bg-indigo-600 text-white shadow-lg",
        glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-800 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-800/50 shadow-md",
      }[theme as "dark" | "indigo" | "glass"] || "bg-zinc-950 text-white";

      const positionArrow = {
        top: "bottom-0 translate-y-1/2 rotate-45 border-r border-b",
        bottom: "top-0 -translate-y-1/2 rotate-45 border-l border-t",
        left: "right-0 translate-x-1/2 rotate-45 border-r border-t",
        right: "left-0 -translate-x-1/2 rotate-45 border-l border-b",
      }[position as "top" | "bottom" | "left" | "right"] || "bottom-0 translate-y-1/2 rotate-45";

      const arrowThemeClasses = {
        dark: "bg-zinc-950 border-transparent dark:bg-white",
        indigo: "bg-indigo-600 border-transparent",
        glass: "bg-white/80 border-zinc-200/50 dark:bg-zinc-900/80 dark:border-zinc-800/50",
      }[theme as "dark" | "indigo" | "glass"] || "bg-zinc-950";

      const layoutDirection = {
        top: "flex-col items-center",
        bottom: "flex-col-reverse items-center",
        left: "flex-row items-center",
        right: "flex-row-reverse items-center",
      }[position as "top" | "bottom" | "left" | "right"] || "flex-col items-center";

      return (
        <div className="flex flex-col items-center justify-center p-12 w-full min-h-[220px]">
          <div className={`flex ${layoutDirection} gap-2`}>
            <div className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm ${themeBubble} select-none transition-all duration-300`}>
              {content}
              <div className={`absolute w-1.5 h-1.5 ${positionArrow} ${arrowThemeClasses}`} />
            </div>
            <button className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 rounded-xl cursor-default">
              Hover Anchor
            </button>
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { content, position, theme } = props;

      const themeBubble = {
        dark: "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
        indigo: "bg-indigo-600 text-white shadow-lg",
        glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-800 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-800/50 shadow-md",
      }[theme as "dark" | "indigo" | "glass"];

      const positionArrow = {
        top: "bottom-0 translate-y-1/2 rotate-45 border-r border-b",
        bottom: "top-0 -translate-y-1/2 rotate-45 border-l border-t",
        left: "right-0 translate-x-1/2 rotate-45 border-r border-t",
        right: "left-0 -translate-x-1/2 rotate-45 border-l border-b",
      }[position as "top" | "bottom" | "left" | "right"];

      const arrowThemeClasses = {
        dark: "bg-zinc-950 border-transparent dark:bg-white",
        indigo: "bg-indigo-600 border-transparent",
        glass: "bg-white/80 border-zinc-200/50 dark:bg-zinc-900/80 dark:border-zinc-800/50",
      }[theme as "dark" | "indigo" | "glass"];

      return `import React from 'react';

export default function HoverTooltip() {
  return (
    <div className="relative group inline-block">
      <button className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 rounded-xl">
        Hover Me
      </button>

      <div className="absolute hidden group-hover:block transition-all duration-200 z-50">
        <div className="relative px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm ${themeBubble}">
          ${content}
          <div className="absolute w-1.5 h-1.5 ${positionArrow} ${arrowThemeClasses}" />
        </div>
      </div>
    </div>
  );
}`;
    },
  },
  toast: {
    id: "toast",
    name: "Toast",
    category: "feedback",
    description: "A premium toast notification layout featuring auto-dismiss simulation, variant badges, and entry animations.",
    props: {
      message: { type: "text", default: "Database routes synchronized successfully.", description: "The message contents." },
      type: { type: "select", options: ["success", "error", "warning", "info"], default: "success", description: "Color and icon style." },
      showClose: { type: "boolean", default: true, description: "Whether to render a close action trigger." },
    },
    designBreakdown: {
      hierarchy: "Toasts float over root interfaces, using bright variant icons to communicate status instantly without forcing modal actions.",
      spacing: "Internal padding of 14px (p-3.5) with compact gaps keeps notifications legible.",
      typography: "Message copy is structured as a compact text block using regular sizes (text-xs) to prevent screen clutter.",
      motion: "Uses keyframe slide-ins to slide from the screen boundaries, with a fading progress bar tracking lifespan.",
    },
    render: (props: any) => {
      const { message, type, showClose } = props;
      
      const themeConfig = {
        success: { bg: "border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20", icon: "✓", color: "text-emerald-500" },
        error: { bg: "border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20", icon: "✕", color: "text-rose-500" },
        warning: { bg: "border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20", icon: "⚠️", color: "text-amber-500" },
        info: { bg: "border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20", icon: "ℹ", color: "text-indigo-500" },
      }[type as "success" | "error" | "warning" | "info"] || { bg: "border-zinc-200 bg-white", icon: "✓", color: "text-zinc-500" };

      return (
        <div className="w-full max-w-sm p-4 flex justify-center">
          <div className={`w-full p-3.5 border rounded-xl shadow-premium-sm flex items-start gap-3 relative overflow-hidden bg-white dark:bg-zinc-900 ${themeConfig.bg}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 ${themeConfig.color}`}>
              {themeConfig.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-normal">{message}</p>
            </div>
            {showClose && (
              <button className="text-[10px] text-zinc-400 hover:text-zinc-600 cursor-pointer shrink-0">
                ✕
              </button>
            )}
            <div className="absolute bottom-0 left-0 h-[2px] bg-indigo-500/40 w-2/3" />
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { message, type, showClose } = props;
      return `import React, { useEffect } from 'react';

export default function StatusToast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full animate-slide-in">
      <div className="p-3.5 border rounded-xl shadow-premium-sm flex items-start gap-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
        <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center text-xs shrink-0">
          ✓
        </span>
        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex-1 leading-normal">
          \${message}
        </p>
        \${showClose ? '<button onClick={onClose} className="text-xs text-zinc-400">✕</button>' : ''}
        <div className="absolute bottom-0 left-0 h-[2px] bg-indigo-500/50 w-full animate-toast-progress" />
      </div>
    </div>
  );
}`;
    },
  },
  table: {
    id: "table",
    name: "Table",
    category: "layouts",
    description: "A compact data-display grid layout displaying node metrics with sorting states and status badges.",
    props: {
      showPagination: { type: "boolean", default: true, description: "Whether to render page control buttons." },
      density: { type: "select", options: ["relaxed", "compact"], default: "compact", description: "Row padding scale." },
    },
    designBreakdown: {
      hierarchy: "Column headers use distinct gray weighting (text-zinc-500) to separate them from the primary cell data.",
      spacing: "Cell borders are kept minimal (border-b) to keep the data clean without adding visual noise.",
      typography: "Mono-spaced fonts (font-mono) are used for metrics and values to align decimals properly.",
      motion: "Row hovering triggers background transitions over 150ms for clear row tracking.",
    },
    render: (props: any) => {
      const { showPagination, density } = props;
      const data = [
        { name: "api.silo.io", status: "active", latency: "14ms", load: "2.4%" },
        { name: "registry.silo.io", status: "active", latency: "28ms", load: "1.8%" },
        { name: "builder.silo.io", status: "maintenance", latency: "192ms", load: "9.2%" },
      ];

      const rowPadding = density === "compact" ? "p-3" : "p-4.5";

      return (
        <div className="w-full p-4">
          <div className="w-full border border-zinc-200/60 dark:border-zinc-900 rounded-xl overflow-hidden bg-white dark:bg-zinc-950">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200/60 dark:border-zinc-900">
                  <th className={`${rowPadding} font-semibold text-zinc-500`}>Endpoint</th>
                  <th className={`${rowPadding} font-semibold text-zinc-500`}>Status</th>
                  <th className={`${rowPadding} font-semibold text-zinc-500`}>Latency</th>
                  <th className={`${rowPadding} font-semibold text-zinc-500`}>Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-900">
                {data.map((row) => (
                  <tr key={row.name} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors duration-150">
                    <td className={`${rowPadding} font-semibold text-zinc-900 dark:text-zinc-100`}>{row.name}</td>
                    <td className={rowPadding}>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.status === "active" 
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400" 
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {row.status}
                      </span>
                    </td>
                    <td className={`${rowPadding} font-mono text-zinc-500`}>{row.latency}</td>
                    <td className={`${rowPadding} font-mono text-zinc-500`}>{row.load}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showPagination && (
              <div className="p-3 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-200/60 dark:border-zinc-900 flex justify-between items-center text-[10px] font-semibold text-zinc-500">
                <span>Displaying 3 endpoints</span>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-white border border-zinc-200 rounded-md dark:bg-zinc-900 dark:border-zinc-800 hover:bg-zinc-50 cursor-pointer">Previous</button>
                  <button className="px-2 py-1 bg-white border border-zinc-200 rounded-md dark:bg-zinc-900 dark:border-zinc-800 hover:bg-zinc-50 cursor-pointer">Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { showPagination, density } = props;
      const rowPadding = density === "compact" ? "p-3" : "p-4.5";
      return `import React from 'react';

export default function ServerMetricsTable() {
  const data = [
    { name: "api.silo.io", status: "active", latency: "14ms", load: "2.4%" },
    { name: "registry.silo.io", status: "active", latency: "28ms", load: "1.8%" },
    { name: "builder.silo.io", status: "maintenance", latency: "192ms", load: "9.2%" },
  ];

  return (
    <div className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
            <th className="${rowPadding} font-semibold text-zinc-500">Endpoint</th>
            <th className="${rowPadding} font-semibold text-zinc-500">Status</th>
            <th className="${rowPadding} font-semibold text-zinc-500">Latency</th>
            <th className="${rowPadding} font-semibold text-zinc-500">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {data.map((row) => (
            <tr key={row.name} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
              <td className="${rowPadding} font-semibold text-zinc-900 dark:text-zinc-100">\${row.name}</td>
              <td className="${rowPadding}">
                <span className={\`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold \${
                  row.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }\`}>
                  \${row.status}
                </span>
              </td>
              <td className="${rowPadding} font-mono text-zinc-500">\${row.latency}</td>
              <td className="${rowPadding} font-mono text-zinc-500">\${row.load}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ${showPagination ? `<div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500">
        <span>3 endpoints</span>
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-white border border-zinc-200 rounded-md">Prev</button>
          <button className="px-2 py-1 bg-white border border-zinc-200 rounded-md">Next</button>
        </div>
      </div>` : ""}
    </div>
  );
}`;
    },
  },
  emptyState: {
    id: "emptyState",
    name: "Empty State",
    category: "layouts",
    description: "A premium dashed placeholder state containing visual status cues and primary CTA directions.",
    props: {
      headline: { type: "text", default: "No Database Connections", description: "Primary alert title." },
      subline: { type: "text", default: "Connect your cloud database to start scanning schema structures.", description: "Detailed sub-description." },
      showButton: { type: "boolean", default: true, description: "Whether to render a call-to-action button." },
    },
    designBreakdown: {
      hierarchy: "The dashed border creates a clear empty-slot metaphor. The central container draws focus to the primary next step.",
      spacing: "Generous layout padding (py-12 px-6) mimics empty slots without looking sparse.",
      typography: "Headline utilizes clean weight (font-bold text-sm) paired with compact description and action items.",
      motion: "Dashed borders and hover transitions adjust color weight over 250ms.",
    },
    render: (props: any) => {
      const { headline, subline, showButton } = props;
      return (
        <div className="w-full p-4 flex justify-center">
          <div className="w-full max-w-md py-12 px-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center space-y-4 flex flex-col items-center justify-center bg-zinc-50/20 dark:bg-zinc-950/5">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 flex items-center justify-center font-bold text-sm">
              ℹ
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{headline}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[260px] mx-auto">{subline}</p>
            </div>
            {showButton && (
              <button className="px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg cursor-pointer dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
                Setup Connection
              </button>
            )}
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { headline, subline, showButton } = props;
      return `import React from 'react';

export default function EmptyConnectionState() {
  return (
    <div className="py-12 px-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center flex flex-col items-center justify-center">
      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 flex items-center justify-center">
        ℹ
      </div>
      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mt-4">
        ${headline}
      </h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[260px]">
        ${subline}
      </p>
      ${showButton ? `<button className="px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg mt-4">
        Setup Connection
      </button>` : ""}
    </div>
  );
}`;
    },
  },
  navigation: {
    id: "navigation",
    name: "Sidebar Navigation",
    category: "navigation",
    description: "An elegant vertical sidebar navigation container with active group states and micro hover cues.",
    props: {
      expandable: { type: "boolean", default: true, description: "Allows collapsing elements via toggle buttons." },
      badgeValue: { type: "text", default: "9+", description: "Status notification badge value." },
    },
    designBreakdown: {
      hierarchy: "Items use active background weights to show route context, with notification pills highlighting unread events.",
      spacing: "Compact item gaps (gap-1) and internal paddings keep high-density text legible.",
      typography: "Typography weights (font-semibold text-xs) minimize cognitive load while scanning navigation trees.",
      motion: "Hover indicators use responsive opacity transitions over 150ms.",
    },
    render: (props: any) => {
      const { expandable, badgeValue } = props;
      const navItems = [
        { name: "Inbox", badge: badgeValue, active: true },
        { name: "Projects", active: false },
        { name: "Integrations", active: false },
        { name: "Billing", active: false },
      ];

      return (
        <div className="w-full max-w-[240px] p-4 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-900 rounded-2xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Workspace</span>
              {expandable && <span className="text-[10px] text-zinc-400 cursor-pointer">⚙</span>}
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    item.active 
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950" 
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
                      item.active ? "bg-white/20 text-white dark:bg-zinc-900 dark:text-zinc-100" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { expandable, badgeValue } = props;
      return `import React from 'react';

export default function SidebarNav() {
  const navItems = [
    { name: "Inbox", badge: "${badgeValue}", active: true },
    { name: "Projects", active: false },
    { name: "Integrations", active: false },
    { name: "Billing", active: false },
  ];

  return (
    <div className="w-full max-w-[240px] p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-2xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Workspace</span>
          ${expandable ? '<span className="text-[10px] text-zinc-400 cursor-pointer">⚙</span>' : ""}
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={\`flex justify-between items-center px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors \${
                item.active 
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950" 
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
              }\`}
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}`;
    },
  },
  heroSection: {
    id: "heroSection",
    name: "Hero Section",
    category: "templates",
    description: "A gorgeous, high-converting hero layout with customizable call-to-actions.",
    props: {
      headline: { type: "text", default: "Store component sets, keep them sharp.", description: "Main H1 title." },
      badgeText: { type: "text", default: "Silo V1.0 is officially live", description: "Small announcement pill text." },
      ctaPrimary: { type: "text", default: "Get Started Free", description: "Text inside primary button." },
      ctaSecondary: { type: "text", default: "Read Documentation", description: "Text inside secondary button." },
      glowColor: { type: "select", options: ["purple", "emerald", "indigo", "none"], default: "indigo", description: "The color of the background blur." },
    },
    designBreakdown: {
      hierarchy: "The headline forms the visual entry anchor. Custom blur lights accent the center without compromising dark/light legibility.",
      spacing: "Wide sections (py-16) separate header structures cleanly.",
      typography: "Strict line weighting (tracking-tight leading-tight) formats massive header text groups nicely.",
      motion: "CTA buttons translate and scale slightly under hover actions.",
    },
    render: (props: any) => {
      const { headline, badgeText, ctaPrimary, ctaSecondary, glowColor } = props;

      const glowStyle = {
        purple: "from-purple-500/10 via-pink-500/5 to-transparent",
        emerald: "from-emerald-500/10 via-teal-500/5 to-transparent",
        indigo: "from-indigo-500/10 via-violet-500/5 to-transparent",
        none: "from-transparent to-transparent",
      }[glowColor as "purple" | "emerald" | "indigo" | "none"] || "";

      return (
        <section className="relative w-full overflow-hidden py-16 px-6 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/20">
          {glowColor !== "none" && (
            <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b ${glowStyle} blur-3xl rounded-full -z-10`} />
          )}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {badgeText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-900/30">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                {badgeText}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-2xl mx-auto leading-tight">
              {headline}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
              Beautifully crafted, highly interactive UI components designed to serve as the building blocks of your next high-performance landing page.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90 rounded-xl shadow-md cursor-pointer transition-all">
                {ctaPrimary}
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-zinc-600 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl shadow-xs cursor-pointer transition-all">
                {ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      );
    },
    getCode: (props: any) => {
      const { headline, badgeText, ctaPrimary, ctaSecondary, glowColor } = props;

      const glowStyle = {
        purple: "from-purple-500/10 via-pink-500/5 to-transparent",
        emerald: "from-emerald-500/10 via-teal-500/5 to-transparent",
        indigo: "from-indigo-500/10 via-violet-500/5 to-transparent",
        none: "from-transparent to-transparent",
      }[glowColor as "purple" | "emerald" | "indigo" | "none"];

      return `import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-16 px-6 bg-zinc-50/50 dark:bg-zinc-950/20">
      ${glowColor !== "none" ? `{/* Background Glow Ring */}\n      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b ${glowStyle} blur-3xl rounded-full -z-10" />` : ""}
      
      <div className="max-w-3xl mx-auto text-center space-y-6">
        ${badgeText ? `<span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-900/30">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          ${badgeText}
        </span>` : ""}
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-2xl mx-auto leading-tight">
          ${headline}
        </h1>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          Beautifully crafted, highly interactive UI components designed to serve as the building blocks of your next high-performance landing page.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90 rounded-xl shadow-md transition-all">
            ${ctaPrimary}
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-zinc-600 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl shadow-xs transition-all">
            ${ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}`;
    },
  },
  featureSection: {
    id: "featureSection",
    name: "Features Grid",
    category: "templates",
    description: "A gorgeous features grid to showcase your product benefits and details.",
    props: {
      sectionTitle: { type: "text", default: "Everything you need to ship faster.", description: "Main section header." },
      badge: { type: "text", default: "High Performance", description: "Introductory section label." },
      columns: { type: "select", options: ["2", "3"], default: "3", description: "Grid column count." },
    },
    designBreakdown: {
      hierarchy: "Visual column groups split content chunks logically. High contrast numbers anchor reading paths.",
      spacing: "Grid spacing is set to `gap-6` to ensure proper layout boundaries.",
      typography: "Features titles use standard weights (font-bold text-sm) contrasted with light body summaries.",
      motion: "Border details and card layouts transition colors seamlessly under focus actions.",
    },
    render: (props: any) => {
      const { sectionTitle, badge, columns } = props;
      const features = [
        { title: "Zero Config", desc: "No complex initial setups. Copy, paste, and compile in milliseconds." },
        { title: "Tailwind V4 Powered", desc: "Built using Tailwind CSS V4 for blazing fast compiled styles." },
        { title: "Fully Responsive", desc: "Perfect rendering across all viewport layouts and screens." },
      ];

      return (
        <section className="w-full py-16 px-6 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl bg-white dark:bg-zinc-950">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              {badge && (
                <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  // {badge}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {sectionTitle}
              </h2>
            </div>
            <div className={`grid gap-6 ${columns === "2" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {features.map((feat, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-xl space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{feat.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    getCode: (props: any) => {
      const { sectionTitle, badge, columns } = props;
      return `import React from 'react';

export default function FeaturesGrid() {
  const features = [
    { title: "Zero Config", desc: "No complex initial setups. Copy, paste, and compile in milliseconds." },
    { title: "Tailwind V4 Powered", desc: "Built using Tailwind CSS V4 for blazing fast compiled styles." },
    { title: "Fully Responsive", desc: "Perfect rendering across all viewport layouts and screens." },
  ];

  return (
    <section className="w-full py-16 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            // ${badge}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            ${sectionTitle}
          </h2>
        </div>
        <div className="grid gap-6 ${columns === "2" ? "md:grid-cols-2" : "md:grid-cols-3"}">
          {features.map((feat, idx) => (
            <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{feat.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
    },
  },
  pageTransition: {
    id: "pageTransition",
    name: "Page Transition",
    category: "feedback",
    description: "Highly fluid screen-to-screen transition effects including slide, scale, fade, and blur animations.",
    props: {
      type: {
        type: "select",
        options: ["fade", "slide-left", "slide-right", "zoom-in", "blur"],
        default: "fade",
        description: "The type of animation applied during screen entry/exit.",
      },
      duration: {
        type: "select",
        options: ["fast", "normal", "slow"],
        default: "normal",
        description: "The transition animation speed.",
      },
    },
    designBreakdown: {
      hierarchy: "Transitions mask page swapping. The focus remains centered on the main entering layout elements.",
      spacing: "Relative viewports contain content elements accurately during transition shifts.",
      typography: "Typography remains static to anchor focus while styling containers animate.",
      motion: "Utilizes keyframes matching specific ease timing variables (ease-spring, ease-smooth) for high fluid output.",
    },
    render: (props: any) => {
      const type = props.type || "fade";
      const duration = props.duration || "normal";
      
      const [step, setStep] = React.useState(1);
      const [animating, setAnimating] = React.useState(false);
      const [displayStep, setDisplayStep] = React.useState(1);

      const durationClass = {
        fast: "duration-200",
        normal: "duration-350",
        slow: "duration-600",
      }[duration as "fast" | "normal" | "slow"] || "duration-300";

      const transitionClasses = {
        fade: {
          exit: "opacity-0 scale-100",
          enter: "opacity-0 scale-100",
          active: "opacity-100 scale-100",
        },
        "slide-left": {
          exit: "-translate-x-full opacity-0",
          enter: "translate-x-full opacity-0",
          active: "translate-x-0 opacity-100",
        },
        "slide-right": {
          exit: "translate-x-full opacity-0",
          enter: "-translate-x-full opacity-0",
          active: "translate-x-0 opacity-100",
        },
        "zoom-in": {
          exit: "scale-90 opacity-0",
          enter: "scale-110 opacity-0",
          active: "scale-100 opacity-100",
        },
        blur: {
          exit: "blur-md opacity-0",
          enter: "blur-md opacity-0",
          active: "blur-none opacity-100",
        },
      }[type as "fade" | "slide-left" | "slide-right" | "zoom-in" | "blur"] || { exit: "opacity-0", enter: "opacity-0", active: "opacity-100" };

      const triggerTransition = () => {
        if (animating) return;
        setAnimating(true);
        const nextStep = step === 1 ? 2 : 1;
        
        setTimeout(() => {
          setDisplayStep(nextStep);
          setStep(nextStep);
          setTimeout(() => {
            setAnimating(false);
          }, 50);
        }, duration === "fast" ? 200 : duration === "slow" ? 600 : 350);
      };

      return (
        <div className="w-full max-w-sm flex flex-col items-center gap-4 p-4 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/20">
          <div className="w-full flex justify-between items-center px-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Router Simulator
            </span>
            <button
              onClick={triggerTransition}
              className="px-2.5 py-1 text-[10px] font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md shadow-xs hover:opacity-90 cursor-pointer"
            >
              Trigger Navigation
            </button>
          </div>

          <div className="relative w-full h-[180px] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800 overflow-hidden flex items-center justify-center p-5">
            <div
              className={`w-full text-center space-y-2 transition-all ease-out ${durationClass} ${
                animating ? transitionClasses.exit : transitionClasses.active
              }`}
            >
              {displayStep === 1 ? (
                <>
                  <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                    A
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Workspace dashboard</h4>
                  <p className="text-[10px] text-zinc-400 leading-normal max-w-[220px] mx-auto">
                    Index route containing metadata specifications and client component definitions.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                    B
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Analytics database</h4>
                  <p className="text-[10px] text-zinc-400 leading-normal max-w-[220px] mx-auto">
                    Telemetry dashboard with chart streams and focus-trapped workspace layouts.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      );
    },
    getCode: (props: any) => {
      const { type, duration } = props;

      const durationMs = {
        fast: 200,
        normal: 350,
        slow: 600,
      }[duration as "fast" | "normal" | "slow"] || 350;

      const durationClass = {
        fast: "duration-200",
        normal: "duration-350",
        slow: "duration-600",
      }[duration as "fast" | "normal" | "slow"] || "duration-350";

      const transitionClasses = {
        fade: {
          exit: "opacity-0 scale-100",
          enter: "opacity-0 scale-100",
          active: "opacity-100 scale-100",
        },
        "slide-left": {
          exit: "-translate-x-full opacity-0",
          enter: "translate-x-full opacity-0",
          active: "translate-x-0 opacity-100",
        },
        "slide-right": {
          exit: "translate-x-full opacity-0",
          enter: "-translate-x-full opacity-0",
          active: "translate-x-0 opacity-100",
        },
        "zoom-in": {
          exit: "scale-90 opacity-0",
          enter: "scale-110 opacity-0",
          active: "scale-100 opacity-100",
        },
        blur: {
          exit: "blur-md opacity-0",
          enter: "blur-md opacity-0",
          active: "blur-none opacity-100",
        },
      }[type as "fade" | "slide-left" | "slide-right" | "zoom-in" | "blur"];

      return `import React, { useState } from 'react';

export default function PageTransitionWrapper() {
  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [displayStep, setDisplayStep] = useState(1);

  const triggerNavigation = () => {
    if (animating) return;
    setAnimating(true);
    const nextStep = step === 1 ? 2 : 1;
    
    // Wait for exit transition, swap screens, then trigger enter
    setTimeout(() => {
      setDisplayStep(nextStep);
      setStep(nextStep);
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, ${durationMs});
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <button 
        onClick={triggerNavigation}
        className="px-4 py-2 text-xs font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 rounded-xl"
      >
        Simulate Page Switch
      </button>

      <div className="relative w-full h-[200px] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center p-6">
        <div className={\`w-full text-center space-y-2 transition-all ease-out ${durationClass} \${
          animating 
            ? "${transitionClasses.exit}" 
            : "${transitionClasses.active}"
        }\`}>
          {displayStep === 1 ? (
            <div>Screen A Content</div>
          ) : (
            <div>Screen B Content</div>
          )}
        </div>
      </div>
    </div>
  );
}`;
    },
  },
};
