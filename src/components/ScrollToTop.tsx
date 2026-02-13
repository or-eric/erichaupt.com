'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth out the progress value for the SVG path
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-deep-slate/90 text-bone shadow-xl backdrop-blur-sm transition-colors hover:bg-deep-slate"
                    aria-label="Scroll to top"
                >
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48">
                        <circle
                            cx="24"
                            cy="24"
                            r="23"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="transparent"
                            className="text-white/10"
                        />
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="23"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            className="text-emerald-500"
                            style={{ pathLength: scaleX }}
                        />
                    </svg>

                    <ArrowUp size={20} className="relative z-10" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
