import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Smartphone, Globe, AppWindow, Megaphone, Bot, BrainCircuit, BotMessageSquare, Code2, Gauge, Rocket, Layers } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";
import Marquee from "@/components/Marquee";
import { Reveal, Eyebrow } from "@/components/Reveal";

const MaskedLine = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const SERVICES = [
  { icon: Smartphone, title: "App Development", desc: "Native & cross-platform iOS and Android apps built for scale." },
  { icon: Globe, title: "Web Development", desc: "Fast, SEO-ready websites engineered to convert visitors into clients." },
  { icon: AppWindow, title: "Web App Development", desc: "Full-stack dashboards, portals and SaaS platforms with modern stacks." },
  { icon: Megaphone, title: "Marketing", desc: "Digital ads, SEO and growth campaigns that compound month over month." },
  { icon: Bot, title: "AI Agents", desc: "Autonomous agents that handle workflows, follow-ups and ops end-to-end." },
  { icon: BrainCircuit, title: "RAG-Based Systems", desc: "Chat over your own documents and data with retrieval-grounded AI." },
  { icon: BotMessageSquare, title: "AI Chatbots", desc: "24/7 customer-facing bots for support, sales and lead capture." },
  { icon: Code2, title: "Custom Software", desc: "Bespoke internal tools and systems shaped exactly to your process." },
];

const HeroVisual = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 28);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 28);
  };

  return (
    <div
      data-testid="hero-visual"
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative h-[420px] sm:h-[520px] hidden lg:block"
    >
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_35%_30%,#FDE68A_0%,#EAB308_35%,#92690a_75%,transparent_100%)] opacity-90 blur-[2px] gold-glow"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border border-yellow-500/20" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[28rem] rounded-full border border-white/5" />
      {[
        { icon: Gauge, label: "98/100 PageSpeed", pos: "top-8 left-2", delay: 0.5 },
        { icon: Rocket, label: "3.2x Conversion Uplift", pos: "top-1/3 right-0", delay: 0.7 },
        { icon: Layers, label: "40+ Builds Shipped", pos: "bottom-10 left-8", delay: 0.9 },
      ].map((m) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: m.delay, duration: 0.6 }}
          className={`absolute ${m.pos} glass-panel px-4 py-3 flex items-center gap-3`}
        >
          <m.icon className="h-4 w-4 text-yellow-500" />
          <span className="font-mono-tech text-xs tracking-wider text-neutral-300">{m.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default function Home() {
  const { open: openContact } = useContactModal();
  const location = useLocation();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 90]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);

  useEffect(() => {
    if (location.hash === "#services") {
      setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }), 150);
    }
  }, [location.hash]);

  return (
    <main data-testid="home-page">
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.07),transparent_55%)]" />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-mono-tech text-xs uppercase tracking-[0.25em] text-yellow-500/80 mb-6"
            >
              01 // Digital Architecture & Branding
            </motion.p>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-neutral-50">
              <MaskedLine delay={0.2}>We engineer</MaskedLine>
              <MaskedLine delay={0.32}>
                <span className="font-serif-display italic font-medium text-gold-gradient">high-converting</span>
              </MaskedLine>
              <MaskedLine delay={0.44}>digital flagships.</MaskedLine>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-7 max-w-xl text-base sm:text-lg text-neutral-400 leading-relaxed"
            >
              Nexvora Labs partners with ambitious enterprises to deliver bespoke engineering, SEO dominance, and high-margin e-commerce architecture.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                data-testid="hero-explore-pricing-btn"
                to="/pricing"
                className="group flex items-center gap-2 bg-yellow-500 text-black font-heading font-semibold px-7 py-3.5 transition-colors duration-300 hover:bg-yellow-400"
              >
                Explore Pricing
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                data-testid="hero-start-project-btn"
                onClick={() => openContact("General Inquiry")}
                className="flex items-center gap-2 border border-white/15 text-neutral-200 font-heading font-medium px-7 py-3.5 transition-colors duration-300 hover:border-yellow-500/60 hover:text-yellow-400"
              >
                Start Project
              </button>
            </motion.div>
          </div>
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </motion.div>
      </section>

      <Marquee />

      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32" data-testid="services-section">
        <Reveal>
          <Eyebrow>02 // Capabilities & Services</Eyebrow>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-50 max-w-2xl">
            Full-spectrum <span className="font-serif-display italic font-medium text-gold-gradient">digital execution.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div
                data-testid={`service-card-${s.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="group h-full glass-panel p-6 sm:p-8 transition-all duration-500 hover:border-yellow-500/40 hover:gold-glow hover:-translate-y-1"
              >
                <s.icon className="h-7 w-7 text-yellow-500 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-6 font-heading text-lg sm:text-xl font-semibold text-neutral-100">{s.title}</h3>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <button
              data-testid="services-cta-card"
              onClick={() => openContact("General Inquiry")}
              className="group h-full w-full text-left bg-yellow-500 p-6 sm:p-8 transition-colors duration-500 hover:bg-yellow-400"
            >
              <ArrowUpRight className="h-7 w-7 text-black transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <h3 className="mt-6 font-heading text-lg sm:text-xl font-semibold text-black">Have a brief in mind?</h3>
              <p className="mt-3 text-sm text-black/70 leading-relaxed">Send it over — we reply within one business day.</p>
            </button>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0B0B0E]" data-testid="manifesto-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <Reveal>
            <Eyebrow>03 // Our Manifesto</Eyebrow>
            <p className="font-serif-display italic text-3xl sm:text-5xl lg:text-6xl leading-[1.15] text-neutral-200 max-w-4xl">
              No templates. No fluff. Just <span className="text-gold-gradient not-italic font-semibold">precision engineering</span> and design that <span className="text-gold-gradient not-italic font-semibold">commands attention.</span>
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10">
              {[
                ["40+", "Builds shipped"],
                ["98", "Avg. PageSpeed"],
                ["12", "Industries served"],
                ["24h", "Response time"],
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
    </main>
  );
}
