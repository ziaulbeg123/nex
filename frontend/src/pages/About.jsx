import { ArrowUpRight, Award, Zap, Compass } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";
import { Reveal, Eyebrow } from "@/components/Reveal";

const PROJECTS = [
  {
    id: "aurelia-jewels",
    name: "Aurelia Jewels",
    sector: "Luxury D2C E-Commerce",
    plan: "Plus",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    desc: "Headless storefront with secure checkout, custom animations and ivory-print packaging inserts for a heritage jewellery house.",
    results: ["3.2x conversion uplift", "0.8s LCP"],
  },
  {
    id: "fitforge",
    name: "FitForge",
    sector: "Fitness Platform · iOS + Android",
    plan: "Grow",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    desc: "Cross-platform app with workout tracking, digital ads engine and a companion marketing site built for sub-second loads.",
    results: ["40k downloads in 90 days", "4.8★ store rating"],
  },
  {
    id: "kaveri-textiles",
    name: "Kaveri Textiles",
    sector: "B2B Heritage Brand",
    plan: "Pro",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    desc: "Multilingual catalogue site with a technical SEO engine, ivory template prints and posters for a 60-year-old textile house.",
    results: ["+212% organic traffic", "4 languages live"],
  },
  {
    id: "urbanmoto",
    name: "UrbanMoto",
    sector: "Riding Gear & Merch",
    plan: "Enterprise",
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    desc: "Full brand system with e-commerce, helmet and apparel merch lines, seasonal redesigns and franchise onboarding flows.",
    results: ["12 franchises onboarded", "Pan-India deliveries"],
  },
];

const VALUES = [
  { icon: Compass, title: "Precision", desc: "Every pixel and every query is deliberate. Nothing ships by accident." },
  { icon: Zap, title: "Speed", desc: "Sub-second loads and same-day replies. Momentum is a feature." },
  { icon: Award, title: "Ownership", desc: "One senior team, end to end — no handoffs, no excuses." },
];

const ProjectCard = ({ project, index }) => (
  <Reveal delay={(index % 2) * 0.12} className={index % 2 === 1 ? "md:mt-16" : ""}>
    <article data-testid={`about-project-${project.id}`} className="group glass-panel overflow-hidden transition-all duration-500 hover:border-yellow-500/40 hover:gold-glow">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.img}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/90 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 bg-yellow-500 text-black px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-[0.2em] font-semibold">
          {project.plan} build
        </span>
      </div>
      <div className="p-6 sm:p-8">
        <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-yellow-500/80">{project.sector}</p>
        <h3 className="mt-2 font-heading text-xl sm:text-2xl font-semibold text-neutral-100">{project.name}</h3>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{project.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.results.map((r) => (
            <span key={r} className="px-3 py-1 border border-yellow-500/25 bg-yellow-500/5 text-yellow-400 font-mono-tech text-xs">
              {r}
            </span>
          ))}
        </div>
      </div>
    </article>
  </Reveal>
);

export default function About() {
  const { open: openContact } = useContactModal();

  return (
    <main data-testid="about-page" className="pt-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.07),transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative">
          <Reveal>
            <Eyebrow>01 // The Lab</Eyebrow>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-neutral-50 max-w-3xl">
              A small lab, <span className="font-serif-display italic font-medium text-gold-gradient">obsessed with craft.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base sm:text-lg text-neutral-400 leading-relaxed">
              Nexvora Labs is a senior-only studio out of Mumbai. We take on a handful of builds a year — websites, apps, brands and merch — and treat each one like a flagship. The proof is below.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10">
              {[
                ["40+", "Builds shipped"],
                ["12", "Industries served"],
                ["6", "Years in the lab"],
                ["100%", "Senior-only team"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-heading text-3xl sm:text-4xl font-bold text-yellow-500">{num}</p>
                  <p className="mt-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28" data-testid="about-projects-section">
        <Reveal>
          <Eyebrow>02 // Selected Work</Eyebrow>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-50 max-w-2xl">
            Previous builds <span className="font-serif-display italic font-medium text-gold-gradient">we're proud of.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0B0B0E]" data-testid="about-values-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <Eyebrow>03 // How We Work</Eyebrow>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="glass-panel p-6 sm:p-8 h-full transition-all duration-500 hover:border-yellow-500/40">
                  <div className="flex items-center justify-between">
                    <v.icon className="h-6 w-6 text-yellow-500" />
                    <span className="font-mono-tech text-xs text-neutral-600">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-heading text-lg sm:text-xl font-semibold text-neutral-100">{v.title}</h3>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-6 justify-between glass-panel p-8 sm:p-12">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-neutral-50">
                Want to be build <span className="text-gold-gradient">#05</span> on this wall?
              </h3>
              <button
                data-testid="about-cta-btn"
                onClick={() => openContact("General Inquiry")}
                className="group shrink-0 flex items-center gap-2 bg-yellow-500 text-black font-heading font-semibold px-8 py-4 transition-colors hover:bg-yellow-400"
              >
                Start Project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
