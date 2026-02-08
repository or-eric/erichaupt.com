import { Compass, Crosshair, Hammer } from 'lucide-react';

const pillars = [
    {
        title: 'The Strategist',
        description: 'Founder, Obsidian Rowe. Focused on delivering Decision Advantage. I partner with organizations to cut through the fog of complexity, providing the strategic consulting and software architecture needed to turn uncertainty into a competitive edge.',
        icon: Compass,
    },
    {
        title: 'The Operator',
        description: 'Foundations in military service, rooted in institutional discipline. At Fort Eisenhower, I lead at the intersection of national security and the digital frontier, applying high-stakes leadership to protect and project power in the cyber domain.',
        icon: Crosshair,
    },
    {
        title: 'The Builder',
        description: 'AI Developer & Software Architect. Turning strategy into code. From architecting Project ARES to building custom AI workflows, I believe that true understanding comes from building, creating the tools that automate intelligence and solve hard problems.',
        icon: Hammer,
    },
];

export default function ThreePillars() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {pillars.map((pillar, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-start gap-4 border-t border-deep-slate/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50"
                    >
                        <div className="mb-4 text-deep-slate">
                            <pillar.icon size={32} strokeWidth={1.5} />
                        </div>

                        <h3 className="font-serif text-3xl font-bold text-deep-slate">
                            {pillar.title}
                        </h3>

                        <p className="max-w-sm font-sans text-base leading-relaxed text-slate-600">
                            {pillar.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
