"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { developerProfile } from "../data/portfolio";

import { SectionPastelBackground } from "./SectionPastelBackground";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#E4E4E7] scroll-mt-16 bg-[#FAFAF9]"
    >
      <SectionPastelBackground variant="pink-left" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="mb-12 sm:mb-16 border-b border-zinc-200/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ 06 — Inquiries ]
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.9]">
              Get In<br />Touch
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed max-w-sm">
            Have an open role, a project idea, or questions about my work? I typically respond within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct contact info */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <h3 className="text-xl font-light tracking-tight text-zinc-950 mb-2">
                Direct Contact
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                I typically respond within one business day to full-time opportunities and technical inquiries.
              </p>

              {/* Email row with copy */}
              <div className="p-3.5 rounded-xl border border-zinc-200 bg-white flex items-center justify-between gap-2 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <span className="text-xs font-mono text-zinc-800 truncate">
                    {developerProfile.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs text-zinc-600 hover:text-blue-600 font-medium cursor-pointer p-1 transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <span className="text-xs text-emerald-600 font-medium">Copied</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Channels list */}
              <div className="space-y-2">
                <a
                  href={developerProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 text-xs font-medium text-zinc-800 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-zinc-600" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>

                <a
                  href={developerProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 text-xs font-medium text-zinc-800 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-zinc-600" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200/80 text-xs text-zinc-500">
              <span className="font-medium text-zinc-700">Availability:</span>{" "}
              {developerProfile.availability}
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-7 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <h3 className="text-xl font-light tracking-tight text-zinc-950 mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-zinc-500 mb-5">
                Fill out the form below to send an email inquiry directly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-lg bg-zinc-50 border border-zinc-200 text-center">
                  <Check className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-zinc-950 mb-1">
                    Message Sent
                  </h4>
                  <p className="text-xs text-zinc-600 mb-4">
                    Thank you, {formData.name}. I will follow up shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-zinc-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-zinc-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Project or role inquiry"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Write your note here..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-zinc-950 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
