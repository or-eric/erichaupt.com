export default function TelemetryHUD() {
    const stats = [
        { label: 'Days Since Last Commit', value: '2' },
        { label: 'Current Location', value: 'Augusta, GA' },
        { label: 'System Status', value: 'NOMINAL', color: 'text-emerald-500' },
        { label: 'F1 Status', value: 'Race Week', color: 'text-amber-500' },
    ];

    return (
        <div className="mb-12 grid grid-cols-2 gap-4 rounded-md border border-deep-slate/10 bg-slate-50 p-4 font-mono text-xs md:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                    <span className="uppercase text-slate-400">{stat.label}</span>
                    <span className={`font-bold text-deep-slate ${stat.color || ''}`}>
                        {stat.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
