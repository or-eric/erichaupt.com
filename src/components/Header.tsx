'use client';

import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openCommandPalette = () => {
        setMobileMenuOpen(false); // Close mobile menu if open
        // Dispatch keyboard event to trigger CommandPalette listener
        const event = new KeyboardEvent('keydown', {
            key: 'k',
            metaKey: true,
            bubbles: true
        });
        document.dispatchEvent(event);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-bone/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-serif text-xl font-bold text-deep-slate tracking-tight hover:opacity-80 transition-opacity z-50">
                    Eric Haupt
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="font-sans text-sm font-medium text-slate-600 hover:text-deep-slate transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="font-sans text-sm font-medium text-slate-600 hover:text-deep-slate transition-colors">
                        About
                    </Link>
                    <Link href="/musings" className="font-sans text-sm font-medium text-slate-600 hover:text-deep-slate transition-colors">
                        Musings
                    </Link>
                    <Link href="/work" className="font-sans text-sm font-medium text-slate-600 hover:text-deep-slate transition-colors">
                        Work
                    </Link>

                    <button
                        onClick={openCommandPalette}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:text-deep-slate transition-colors"
                    >
                        <Search size={14} />
                        <span className="font-mono">Cmd+K</span>
                    </button>
                </nav>

                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-deep-slate z-50 p-2"
                    aria-label="Toggle menu"
                >
                    <Menu size={24} />
                </button>

                {/* Mobile Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bone pt-20 md:hidden animate-in fade-in duration-200">
                        <nav className="flex flex-col items-center gap-8 text-lg">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-serif font-bold text-deep-slate">Home</Link>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="font-serif font-bold text-deep-slate">About</Link>
                            <Link href="/musings" onClick={() => setMobileMenuOpen(false)} className="font-serif font-bold text-deep-slate">Musings</Link>
                            <Link href="/work" onClick={() => setMobileMenuOpen(false)} className="font-serif font-bold text-deep-slate">Work</Link>
                            <button
                                onClick={openCommandPalette}
                                className="mt-8 flex items-center gap-2 rounded-full border border-deep-slate bg-deep-slate px-6 py-3 text-bone"
                            >
                                <Search size={18} />
                                <span>Search (Cmd+K)</span>
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
