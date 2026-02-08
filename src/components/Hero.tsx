'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4 py-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-4xl space-y-8"
            >
                <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                    Decision Advantage at the Intersection of Cyber, AI, and Leadership.
                </h1>

                <p className="mx-auto max-w-[600px] text-lg text-slate-600 md:text-xl">
                    I help organizations navigate high-stakes complexity through the lens of a Stoic Operator. Bridging the gap between institutional discipline and technical innovation.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="rounded-md bg-deep-slate px-8 py-3 font-medium text-bone transition-transform hover:scale-105 active:scale-95">
                        Get in Touch
                    </button>
                    <button className="rounded-md border-2 border-deep-slate px-8 py-3 font-medium text-deep-slate transition-colors hover:bg-slate-100 active:bg-slate-200">
                        View Work
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
