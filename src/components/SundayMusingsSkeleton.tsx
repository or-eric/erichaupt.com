export default function SundayMusingsSkeleton() {
    return (
        <div className="w-full space-y-8 py-24">
            {/* Header Skeleton */}
            <div className="mb-12 h-12 w-64 animate-pulse rounded bg-slate-200" />

            {/* List Items Skeleton */}
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex flex-col items-start gap-4 border-b border-deep-slate/10 py-8 md:flex-row md:items-center md:justify-between"
                >
                    {/* Date/Category */}
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200 md:w-48" />

                    {/* Title & Excerpt */}
                    <div className="flex-1 space-y-3 md:px-8">
                        <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                    </div>

                    {/* Arrow */}
                    <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
                </div>
            ))}
        </div>
    );
}
