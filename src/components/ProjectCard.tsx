'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    description: string;
    status: 'In Development' | 'Live' | 'Concept' | 'Stealth';
    techStack: string[];
    progress?: number;
}

export default function ProjectCard({
    title,
    description,
    status,
    techStack,
    progress,
}: ProjectCardProps) {
    const isStealth = String(title).toLowerCase().includes('ares') || status === 'Stealth';

    return (
        <div
            className={clsx(
                'group relative flex flex-col justify-between overflow-hidden rounded-lg border p-8 transition-all duration-500',
                isStealth
                    ? 'border-deep-slate/30 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-deep-slate/50' // Frosted Glass for stealth
                    : 'border-deep-slate/10 bg-white hover:border-deep-slate/30 hover:shadow-lg'
            )}
        >
            {/* Decorative Plotting Lines */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-deep-slate/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 h-16 w-16 translate-x-8 translate-y-8 rotate-45 border-l border-t border-deep-slate/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div>
                <div className="mb-6 flex items-start justify-between">
                    <h3 className={clsx("font-serif text-2xl font-bold text-deep-slate", isStealth && "text-transparent bg-clip-text bg-gradient-to-r from-deep-slate to-slate-500")}>
                        {title}
                    </h3>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-mono font-medium text-slate-600 bg-slate-50/50">
                        {status === 'In Development' && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                        )}
                        {status === 'Live' && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                        {status === 'Stealth' && <span className="h-2 w-2 rounded-full bg-purple-500" />}
                        {status}
                    </div>
                </div>

                <p className="mb-8 font-sans text-sm leading-relaxed text-slate-600">
                    {description}
                </p>

                {/* Technical Specification List Style for Description? - No, keeping as text for readability, using standard technical font */}
            </div>

            <div className="space-y-4">
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

                {/* Tech Stack Hover Flex */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-deep-slate/5">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded bg-slate-100 px-2 py-1 font-mono text-[10px] font-medium text-slate-600 uppercase tracking-wide opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
