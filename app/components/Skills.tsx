import { profile } from "@/data/profile";

export default function Skills() {
  const { skills } = profile;

  const skillGroups = [
    {
      index: "01",
      category: "Languages",
      items: skills.languages,
    },
    {
      index: "02",
      category: "Web & Full-Stack",
      items: skills.web,
    },
    {
      index: "03",
      category: "Control & Embedded Systems",
      items: skills.engineeringAndEmbedded,
    },
    {
      index: "04",
      category: "Tools & Environments",
      items: skills.tools,
    },
  ];

  return (
    <section
      id="skills"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-6"
    >
      <div className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/80 pb-4">
          <div>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
              03 / CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Technologies & Engineering Skills
            </h2>
          </div>
          <span className="text-xs font-mono text-foreground-subtle">
            Languages · Web · Hardware & Control · Tooling
          </span>
        </div>

        {/* Clean Large Numbered Rows */}
        <div className="divide-y divide-border">
          {skillGroups.map((group) => (
            <div
              key={group.index}
              className="py-7 first:pt-2 last:pb-2 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline group"
            >
              {/* Index & Category (5 cols) */}
              <div className="md:col-span-5 flex items-baseline gap-3">
                <span className="text-lg font-mono font-light text-foreground-subtle group-hover:text-accent transition-colors select-none">
                  {group.index}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-foreground tracking-tight">
                  {group.category}
                </h3>
              </div>

              {/* Technologies List (7 cols) */}
              <div className="md:col-span-7">
                <p className="text-base text-foreground font-mono leading-relaxed">
                  {group.items.join("  ·  ")}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
