import { createClient } from '@/utils/supabase/server';
import ProjectCard from './ProjectCard';

interface Project {
    id: string;
    title: string;
    description: string;
    status: 'In Development' | 'Live' | 'Concept' | 'Stealth';
    tech_stack: string[];
    progress?: number;
    slug?: string;
    href?: string;
    cta_text?: string;
    is_featured?: boolean;
}

export default async function TheLab() {
    let projects: Project[] = [];

    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) projects = data as Project[];
    } catch {
        // access fallback
    }


    // Use Mock Data if no projects found (or DB not connected)
    if (projects.length === 0) {
        projects = [
            {
                id: 'ares',
                title: 'Project ARES',
                description: 'Automated Response & Engagement System. An autonomous AI agent designed for high-speed cyber defense and threat neutralization. Currently in stealth mode.',
                status: 'Stealth',
                tech_stack: ['Python', 'TensorFlow', 'FastAPI', 'LangChain'],
            },
            {
                id: 'cve-analyzer',
                title: 'CVE Analyzer & Trainer',
                description: 'Interactive platform for analyzing Common Vulnerabilities and Exposures. Features guided training modules for security professionals to understand patch management.',
                status: 'In Development',
                tech_stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
                progress: 40,
            },
        ];
    }

    // Inject "Curated Intelligence" & "Obsidian Rowe" as Primary/Featured Cards
    const curatedIntelligence: Project = {
        id: 'curated-intelligence',
        title: 'Curated Intelligence',
        description: 'A specialized intelligence platform designed to eliminate information overload by aggregating and filtering thousands of feeds and data into high-fidelity signal.',
        status: 'Live',
        tech_stack: ['Next.js', 'AI Agents', 'Edge', 'Intelligence'],
        href: 'https://ci.orlabs.dev',
        cta_text: 'Launch Platform',
        is_featured: true,
    };

    const obsidianPlatform: Project = {
        id: 'obsidian-platform',
        title: 'Obsidian Rowe Platform',
        description: 'A strategic consulting framework and digital hub designed to bridge the gap between complex cybersecurity compliance and actionable AI-driven intelligence. Serving as the operational foundation for high-stakes organizational strategy.',
        status: 'Live',
        tech_stack: ['React', 'Node.js', 'GraphQL', 'Compliance', 'Consulting', 'AI-Governance'],
        href: 'https://www.obsidianrowe.com',
        cta_text: 'Launch Platform',
        is_featured: true,
    };

    // Unshift to top (Order: Obsidian, then Curated, or vice versa? User requested Curated first, then Obsidian. Unshift logic: unshift(a, b) puts a then b at start.)
    // Actually, unshift(a, b) results in [a, b, ...rest].
    // Wait, unshift adds elements to the start.
    // If we want [Curated, Obsidian, ...], we unshift(Curated, Obsidian).
    // Let's do unshift(curatedIntelligence, obsidianPlatform);

    projects.unshift(curatedIntelligence, obsidianPlatform);

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="mb-12 flex items-baseline gap-4">
                <h2 className="font-serif text-4xl font-bold text-deep-slate md:text-5xl">
                    The Lab
                </h2>
                <span className="font-mono text-sm text-slate-400">
          // Experimental Projects & Prototypes
                </span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        status={project.status}
                        techStack={project.tech_stack}
                        progress={project.progress}
                        href={project.href}
                        ctaText={project.cta_text}
                        isFeatured={project.is_featured}
                    />
                ))}
            </div>
        </section>
    );
}
