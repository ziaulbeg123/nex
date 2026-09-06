import { ArrowUpRight, Award, Zap, Compass } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";
import { Reveal, Eyebrow } from "@/components/Reveal";

const PROJECTS = [
  {
    id: "flyeducation",
    name: "Edufly — flyeducation.in",
    sector: "Study-Abroad Consultancy",
    badge: "Live Site",
    url: "https://flyeducation.in",
    img: "/projects/flyeducation.jpg",
    desc: "Editorial boarding-pass style site for a study-abroad studio — university applications, visa processing and scholarships across UK, Germany, Poland and Dubai, with live placement counter and consultation booking.",
    results: ["12,480+ students placed", "99.2% visa success"],
  },
  {
    id: "wzanalytics",
    name: "WZ Analytics — wzanalytics.site",
    sector: "AI SaaS · Poland & UK",
    badge: "Live Site",
    url: "https://wzanalytics.site",
    img: "/projects/wzanalytics.jpg",
    desc: "Bilingual (PL/EN) product site for an AI analytics service that emails daily business reports to restaurants and cafés — with pricing, FAQ and a 2-week free-trial funnel.",
    results: ["50+ businesses served", "+18% avg. revenue growth"],
  },
  {
    id: "personal-portfolios",
    name: "Personal Portfolios",
    sector: "Founders · Creators · Professionals",
    badge: "Ongoing",
    url: null,
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
    desc: "Custom-coded portfolio sites for founders, creators and working professionals — sharp personal branding, sub-second loads and SEO baked in from day one.",
    results: ["Custom design + code", "SEO-ready, sub-second loads"],
  },
];

const VALUES = [
  { icon: Compass, title: "Precision", desc: "Every pixel and every query is deliberate. Nothing ships by accident." },
  { icon: Zap, title: "Speed", desc: "Sub-second loads and same-day replies. Momentum is a feature." },
  { icon: Award, title: "Ownership", desc: "One senior team, end to end — no handoffs, no excuses." },
];

const ProjectCard = ({ project, index }) => {
  const inner = (
    <article data-testid={`about-project-${project.id}`} className="group glass-panel overflow-hidden h-full transition-all duration-500 hover:border-yellow-500/40 hover:gold-glow">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.img}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/90 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 flex items-center gap-1.5 bg-yellow-500 text-black px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-[0.2em] font-semibold">
          {project.badge}
          {project.url && <ArrowUpRight className="h-3 w-3" />}
        </span>
      </div>
      <div className="p-6 sm:p-7">
        <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-yellow-500/80">{project.sector}</p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-neutral-100">{project.name}</h3>
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
  );

  return (
    <Reveal delay={(index % 3) * 0.1} className={index % 3 === 1 ? "lg:mt-14" : ""}>
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" data-testid={`about-project-link-${project.id}`} className="block h-full">
          {inner}
        </a>
      ) : (
        inner
      )}
    </Reveal>
  );
};

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
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
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
