'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Search,
    Home,
    BookOpen,
    Briefcase,
    Mail,
    Linkedin,
    Github,
    Copy
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-deep-slate/50 p-4 backdrop-blur-sm pt-[20vh]">
            <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-deep-slate/20 bg-bone shadow-2xl">
                <Command className="w-full">
                    <div className="flex items-center border-b border-deep-slate/10 px-4" cmdk-input-wrapper="">
                        <Search className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="flex h-12 w-full border-none bg-transparent py-3 text-sm text-deep-slate outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                        <Command.Empty className="py-6 text-center text-sm text-slate-500">No results found.</Command.Empty>

                        <Command.Group heading="Navigation" className="mb-2 px-2 text-xs font-medium text-slate-500">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/'))}
                                className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-deep-slate outline-none aria-selected:bg-slate-100"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                <span>Home</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/musings'))}
                                className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-deep-slate outline-none aria-selected:bg-slate-100"
                            >
                                <BookOpen className="mr-2 h-4 w-4" />
                                <span>Musings</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/work'))}
                                className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-deep-slate outline-none aria-selected:bg-slate-100"
                            >
                                <Briefcase className="mr-2 h-4 w-4" />
                                <span>Work</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Social" className="mb-2 px-2 text-xs font-medium text-slate-500">
                            <Command.Item
                                onSelect={() => runCommand(() => window.open('https://linkedin.com', '_blank'))}
                                className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-deep-slate outline-none aria-selected:bg-slate-100"
                            >
                                <Linkedin className="mr-2 h-4 w-4" />
                                <span>LinkedIn</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.open('https://github.com', '_blank'))}
                                className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-deep-slate outline-none aria-selected:bg-slate-100"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                <span>GitHub</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Actions" className="mb-2 px-2 text-xs font-medium text-slate-500">
                            <Command.Item
                                onSelect={() => runCommand(() => {
                                    navigator.clipboard.writeText('contact@erichaupt.com');
                                    alert('Email copied to clipboard!');
                                })}
                                className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-deep-slate outline-none aria-selected:bg-slate-100"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Copy Email</span>
                            </Command.Item>
                        </Command.Group>

                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
