import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import LiveSignal from './LiveSignal';

export default function Footer() {
    return (
        <footer className="bg-deep-slate py-12 text-bone">
            <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row">

                {/* Left: Signal & Copyright */}
                <div className="flex flex-col items-center gap-4 md:items-start">
                    <LiveSignal />
                    <p className="font-sans text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Eric Haupt. All rights reserved.
                    </p>
                </div>

                {/* Right: Socials */}
                <div className="flex items-center gap-6">
                    <a
                        href="https://linkedin.com/in/erichaupt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 transition-colors hover:text-bone"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} strokeWidth={1.5} />
                    </a>
                    <a
                        href="https://x.com/erichaupt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 transition-colors hover:text-bone"
                        aria-label="Twitter"
                    >
                        <Twitter size={20} strokeWidth={1.5} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
