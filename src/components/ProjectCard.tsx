'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    status: 'In Development' | 'Live' | 'Concept' | 'Stealth';
    techStack: string[];
    progress?: number;
    href?: string;
    ctaText?: string;
    isFeatured?: boolean;
}

export default function ProjectCard({
    title,
    description,
    status,
    techStack,
    progress,
    href,
    ctaText,
    isFeatured = false,
}: ProjectCardProps) {
    const isStealth = String(title).toLowerCase().includes('ares') || status === 'Stealth';

    return (
        <div
            className={clsx(
                'group relative flex flex-col justify-between overflow-hidden rounded-lg border p-8 transition-all duration-500',
                isFeatured
                    ? 'border-emerald-500/20 bg-emerald-50/5 shadow-xl hover:shadow-2xl hover:border-emerald-500/40'
                    : isStealth
                        ? 'border-deep-slate/30 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-deep-slate/50'
                        : 'border-deep-slate/10 bg-white hover:border-deep-slate/30 hover:shadow-lg'
            )}
        >
            {/* Decorative Plotting Lines */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-deep-slate/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Live Preview Hover Effect (Featured Only) */}
            {isFeatured && (
                <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 opacity-0 transition-all duration-700 ease-out group-hover:opacity-10 translate-x-8 group-hover:translate-x-0 rotate-12">
                    <div className="h-full w-full rounded-xl border border-deep-slate/20 bg-deep-slate p-2 shadow-2xl">
                        <div className="h-full w-full rounded border border-white/10 bg-slate-900/50 p-4">
                            <div className="mb-4 flex gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                                <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                                <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 rounded bg-slate-700/50" />
                                <div className="h-2 w-1/2 rounded bg-slate-700/50" />
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <div className="h-8 rounded bg-slate-800/50" />
                                    <div className="h-8 rounded bg-slate-800/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <div className="mb-6 flex items-start justify-between relative z-10">
                    <h3 className={clsx("font-serif text-2xl font-bold text-deep-slate", (isStealth || isFeatured) && "text-transparent bg-clip-text bg-gradient-to-r from-deep-slate to-slate-500")}>
                        {title}
                    </h3>

                    {/* Status Badge */}
                    <div className={clsx(
                        "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-medium",
                        status === 'Live' ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50/50 text-slate-600"
                    )}>
                        {status === 'In Development' && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                        )}
                        {status === 'Live' && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        )}
                        {status === 'Stealth' && <span className="h-2 w-2 rounded-full bg-purple-500" />}
                        {status}
                    </div>
                </div>

                <p className="mb-8 font-sans text-sm leading-relaxed text-slate-600 relative z-10">
                    {description}
                </p>
            </div>

            <div className="space-y-6 relative z-10">
                {/* Progress Bar (Roadmap Interaction) */}
                {progress !== undefined && (
                    <div className="w-full space-y-2 font-mono text-xs text-slate-500">
                        <div className="flex justify-between">
                            <span>Phase 1: Foundation</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-deep-slate"
                            />
                        </div>
                    </div>
                )}

                {/* CTA Button for Featured Projects */}
                {href && ctaText && (
                    <Link
                        href={href}
                        target="_blank"
                        className="group/btn flex items-center justify-center gap-2 w-full rounded-md bg-deep-slate py-3 text-sm font-medium text-bone transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
                    >
                        {ctaText}
                        <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                    </Link>
                )}

                {/* Tech Stack Hover Flex */}
                <div className="flex flex-wrap gap-2 border-t border-deep-slate/5 pt-4">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className={clsx(
                                "rounded px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wide transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1",
                                isFeatured ? "bg-emerald-100/50 text-emerald-700 opacity-80" : "bg-slate-100 text-slate-600 opacity-70"
                            )}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
