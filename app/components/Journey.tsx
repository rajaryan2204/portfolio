import { profile } from "@/data/profile";

export default function Journey() {
  const { journey } = profile;

  return (
    <section
      id="journey"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-6"
    >
      <div className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/80 pb-4">
          <div>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
              06 / TIMELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Journey & Milestones
            </h2>
          </div>
          <span className="text-xs font-mono text-foreground-subtle">
            Academic & Engineering Evolution
          </span>
        </div>

        {/* Clean Editorial Timeline Rows */}
        <div className="space-y-8 max-w-3xl">
          {journey.map((item, index) => (
            <div key={index} className="space-y-2 group">
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono font-semibold text-accent select-none">
                  {item.year}
                </span>
                <div className="h-[1px] flex-grow bg-border group-hover:bg-neutral-400 transition-colors" />
                {item.tag && (
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-surface border border-border text-foreground-subtle">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="pl-0 sm:pl-4 space-y-1">
                <h3 className="text-lg font-medium text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
