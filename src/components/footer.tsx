"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full relative z-20 bg-surface-soft text-muted py-16 px-6 lg:px-8 mt-auto border-t border-hairline transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 text-ink group">
            <img src="/logo.png" alt="Convertly Logo" className="w-6 h-6 object-contain" />
            <span className="text-xl font-medium font-serif tracking-tight group-hover:text-primary transition-colors">Convertly</span>
          </Link>
          <p className="text-sm max-w-xs text-muted">
            Free image compression and format conversion directly in your browser. No data leaves your device.
          </p>
        </div>
        
        <div className="flex gap-8 sm:gap-16 text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-ink font-medium">Resources</span>
            <a href="https://github.com/therandomuser03/convertly" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">GitHub</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-ink font-medium">Legal</span>
            <Link href="/privacy" className="text-muted hover:text-ink transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-hairline text-xs flex justify-between items-center text-muted-soft">
        <span>© {new Date().getFullYear()} Convertly.</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
