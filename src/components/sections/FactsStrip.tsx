const facts = [
  "fully managed — built + run by us",
  "24/7 monitoring",
  "AI moderation, human handoff",
  "monthly reporting",
  "you never log into anything",
];

export function FactsStrip() {
  return (
    <div className="border-y border-rule bg-bone-deep">
      <ul className="mx-auto flex max-w-[1240px] flex-col md:flex-row">
        {facts.map((fact) => (
          <li
            key={fact}
            className="flex-1 whitespace-nowrap border-b border-rule px-6 py-[13px] text-left font-mono text-[12px] tracking-[0.04em] text-ink-soft last:border-b-0 md:border-b-0 md:border-r md:text-center md:last:border-r-0"
          >
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}
