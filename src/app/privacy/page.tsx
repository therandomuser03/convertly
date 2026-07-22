"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, HardDrive, EyeOff } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Convertly
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-ink mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted font-mono">
            Last updated: July 23, 2026
          </p>
        </div>

        <div className="space-y-8 text-body leading-relaxed">
          {/* Highlight Callout */}
          <div className="bg-surface-card border border-hairline rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium text-ink mb-1">
                Your Privacy is Guaranteed
              </h3>
              <p className="text-sm text-muted">
                Convertly is designed from the ground up as a zero-knowledge, client-side utility. No images, personal information, or user files ever leave your device.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="bg-surface-card/40 border border-hairline rounded-xl p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-2.5 text-ink font-serif text-xl font-medium">
              <HardDrive className="w-5 h-5 text-primary" />
              <h2>1. Zero-Server Processing</h2>
            </div>
            <p className="text-sm md:text-base text-body">
              All image compression, format conversion (JPEG, PNG, WebP, AVIF, etc.), and resizing are executed strictly within your local browser engine via client-side WebAssembly and modern Canvas APIs. At no point are your original or processed images transmitted across the network or stored on any server.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-surface-card/40 border border-hairline rounded-xl p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-2.5 text-ink font-serif text-xl font-medium">
              <EyeOff className="w-5 h-5 text-primary" />
              <h2>2. No Data Collection or Tracking</h2>
            </div>
            <p className="text-sm md:text-base text-body">
              We do not track your activity, harvest metadata from your images, or build user profiles. Convertly uses no third-party tracking scripts, advertising SDKs, or invasive analytics services.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-surface-card/40 border border-hairline rounded-xl p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-2.5 text-ink font-serif text-xl font-medium">
              <Lock className="w-5 h-5 text-primary" />
              <h2>3. Local Storage & Cookies</h2>
            </div>
            <p className="text-sm md:text-base text-body">
              Convertly does not set tracking cookies. Local storage may only be used to remember basic application state (such as your preferred color mode preference: Light or Dark).
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
