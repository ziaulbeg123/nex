import { Link } from "react-router-dom";
import { Check, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useContactModal } from "@/context/ContactModalContext";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { PLANS, ALL_FEATURES } from "@/data/plans";

const PlanCard = ({ plan, onSelect }) => (
  <div
    data-testid={`pricing-card-${plan.id}`}
    className={`relative flex h-full flex-col p-6 transition-all duration-500 hover:-translate-y-1.5 ${
      plan.highlighted
        ? "glass-panel border-yellow-500/60 gold-glow lg:scale-[1.04] z-10"
        : "glass-panel hover:border-yellow-500/35"
    }`}
  >
    {plan.badge && (
      <span
        data-testid={`pricing-badge-${plan.id}`}
        className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 font-mono-tech text-[10px] tracking-[0.2em] uppercase ${
          plan.highlighted ? "bg-yellow-500 text-black font-semibold" : "bg-[#1a1a22] border border-white/10 text-neutral-400"
        }`}
      >
        {plan.badge}
      </span>
    )}
    <h3 className="font-heading text-xl font-semibold text-neutral-100">{plan.name}</h3>
    <div className="mt-4 flex items-baseline gap-2 flex-wrap">
      <span data-testid={`pricing-price-${plan.id}`} className={`font-heading text-3xl font-bold ${plan.highlighted ? "text-gold-gradient" : "text-neutral-50"}`}>
        {plan.price}
      </span>
      {plan.original && <span className="text-sm text-neutral-500 line-through">{plan.original}</span>}
    </div>
    <p className="mt-2 font-mono-tech text-[11px] uppercase tracking-[0.15em] text-yellow-500/90">{plan.savings}</p>
    {plan.maintenance && (
      <p className="mt-3 flex items-center gap-2 text-xs text-yellow-400/90">
        <ShieldCheck className="h-4 w-4 shrink-0" /> {plan.maintenance}
      </p>
    )}
    <ul className="mt-6 mb-8 space-y-2.5 flex-1">
      {plan.features.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-300">
          <Check className="h-4 w-4 mt-0.5 shrink-0 text-yellow-500" />
          {f}
        </li>
      ))}
    </ul>
    <button
      data-testid={`pricing-cta-${plan.id}`}
      onClick={() => onSelect(plan.name)}
      className={`w-full py-3 font-heading font-semibold text-sm transition-colors duration-300 flex items-center justify-center gap-2 ${
        plan.highlighted
          ? "bg-yellow-500 text-black hover:bg-yellow-400"
          : "border border-white/15 text-neutral-200 hover:border-yellow-500/60 hover:text-yellow-400"
      }`}
    >
      {plan.cta} <ArrowUpRight className="h-4 w-4" />
    </button>
  </div>
);

const CompareTable = ({ onSelect }) => (
  <div data-testid="compare-table" className="hidden md:block overflow-x-auto">
    <table className="w-full min-w-[900px] border-collapse text-sm">
      <thead>
        <tr>
          <th className="sticky top-16 z-20 bg-[#0E0E12] border-b border-white/10 p-4 text-left align-bottom w-[22%]">
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500">Features</span>
          </th>
          {PLANS.map((p) => (
            <th
              key={p.id}
              className={`sticky top-16 z-20 border-b p-4 text-center align-top ${
                p.highlighted ? "bg-[#17140a] border-yellow-500/40" : "bg-[#0E0E12] border-white/10"
              }`}
            >
              {p.badge && (
                <span className={`mb-2 inline-block px-2.5 py-0.5 font-mono-tech text-[10px] tracking-[0.2em] uppercase ${p.highlighted ? "bg-yellow-500 text-black font-semibold" : "text-neutral-500 border border-white/10"}`}>
                  {p.badge}
                </span>
              )}
              <p className="font-heading text-lg font-semibold text-neutral-100">{p.name}</p>
              <p className="font-mono-tech text-xs text-yellow-500/90 mt-1">{p.price}</p>
              <button
                data-testid={`compare-cta-${p.id}`}
                onClick={() => onSelect(p.name)}
                className={`mt-3 w-full py-2 text-xs font-heading font-semibold transition-colors ${
                  p.highlighted ? "bg-yellow-500 text-black hover:bg-yellow-400" : "border border-white/15 text-neutral-300 hover:border-yellow-500/60 hover:text-yellow-400"
                }`}
              >
                {p.cta}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ALL_FEATURES.map((feature, ri) => (
          <tr
            key={feature}
            data-testid={`compare-row-${feature.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            className={ri % 2 === 0 ? "bg-white/[0.02]" : ""}
          >
            <td className="p-4 text-neutral-300 border-b border-white/5">{feature}</td>
            {PLANS.map((p) => (
              <td key={p.id} className={`p-4 text-center border-b border-white/5 ${p.highlighted ? "bg-yellow-500/[0.04]" : ""}`}>
                {p.features.includes(feature) ? (
                  <Check className="h-4 w-4 text-yellow-500 mx-auto" />
                ) : (
                  <span className="text-neutral-700 tracking-[0.2em]">······</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CompareAccordion = ({ onSelect }) => (
  <div data-testid="compare-accordion" className="md:hidden">
    <Accordion type="single" collapsible className="space-y-3">
      {PLANS.map((p) => (
        <AccordionItem key={p.id} value={p.id} className={`glass-panel border px-5 ${p.highlighted ? "border-yellow-500/50" : "border-white/10"}`}>
          <AccordionTrigger data-testid={`compare-accordion-trigger-${p.id}`} className="hover:no-underline py-5">
            <span className="flex items-center gap-3 flex-wrap text-left">
              <span className="font-heading text-lg font-semibold text-neutral-100">{p.name}</span>
              <span className="font-mono-tech text-xs text-yellow-500/90">{p.price}</span>
              {p.badge && (
                <span className={`px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.15em] uppercase ${p.highlighted ? "bg-yellow-500 text-black font-semibold" : "text-neutral-500 border border-white/10"}`}>
                  {p.badge}
                </span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.15em] text-yellow-500/80 mb-4">{p.savings}</p>
            {p.maintenance && (
              <p className="mb-4 flex items-center gap-2 text-xs text-yellow-400/90">
                <ShieldCheck className="h-4 w-4" /> {p.maintenance}
              </p>
            )}
            <ul className="space-y-2.5 mb-5">
              {ALL_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  {p.features.includes(f) ? (
                    <>
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-yellow-500" />
                      <span className="text-neutral-300">{f}</span>
                    </>
                  ) : (
                    <>
                      <span className="w-4 text-center text-neutral-700 shrink-0">·</span>
                      <span className="text-neutral-600">{f}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <button
              data-testid={`compare-accordion-cta-${p.id}`}
              onClick={() => onSelect(p.name)}
              className={`w-full py-3 font-heading font-semibold text-sm transition-colors ${
                p.highlighted ? "bg-yellow-500 text-black hover:bg-yellow-400" : "border border-white/15 text-neutral-200 hover:border-yellow-500/60 hover:text-yellow-400"
              }`}
            >
              {p.cta}
            </button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default function Pricing() {
  const { open: openContact } = useContactModal();
  const selectPlan = (name) => openContact(name);

  return (
    <main data-testid="pricing-page" className="pt-16">
      <div
        data-testid="promo-banner"
        className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border-b border-yellow-500/30 py-3 px-4 text-center"
      >
        <p className="text-sm font-medium text-yellow-300 flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="h-4 w-4 shrink-0" />
          Get up to 20% off your first WebMan plan. Offer valid for a limited time**
        </p>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(234,179,8,0.06),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <Reveal>
            <Eyebrow>01 // Transparent Investment</Eyebrow>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-neutral-50 max-w-3xl">
              Per-project pricing, <span className="font-serif-display italic font-medium text-gold-gradient">tailored to your scale.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-neutral-400 leading-relaxed">
              Fixed investment tiers with guaranteed deliverables, zero hidden fees, and ongoing maintenance discounts.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" data-testid="pricing-cards-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch pt-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <PlanCard plan={p} onSelect={selectPlan} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0B0B0E]" data-testid="compare-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <Eyebrow>02 // Side by Side</Eyebrow>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-50">
              Compare all <span className="font-serif-display italic font-medium text-gold-gradient">plans & features</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            <CompareTable onSelect={selectPlan} />
            <CompareAccordion onSelect={selectPlan} />
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" data-testid="pricing-final-cta">
        <Reveal>
          <div className="glass-panel p-8 sm:p-14 flex flex-col sm:flex-row sm:items-center gap-8 justify-between">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-neutral-50">
                Not sure which tier fits?
              </h3>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-md">
                Send us your brief — we will map it to the right plan within one business day.
              </p>
            </div>
            <button
              data-testid="pricing-final-cta-btn"
              onClick={() => openContact("General Inquiry")}
              className="group shrink-0 flex items-center gap-2 bg-yellow-500 text-black font-heading font-semibold px-8 py-4 transition-colors hover:bg-yellow-400"
            >
              Talk to us
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
