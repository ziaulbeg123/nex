const ITEMS = [
  "WEB DEV",
  "APP DEV",
  "SEO DOMINANCE",
  "E-COMMERCE",
  "BRAND MERCH",
  "HIGH PERFORMANCE",
  "NEXVORA LABS",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div data-testid="editorial-marquee" className="overflow-hidden border-y border-yellow-500/10 bg-[#0B0B0E] py-5 select-none">
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center font-mono-tech text-sm tracking-[0.3em] text-neutral-500 uppercase">
            <span className="px-8">{item}</span>
            <span className="text-yellow-500">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
