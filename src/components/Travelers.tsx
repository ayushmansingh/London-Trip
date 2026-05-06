import { motion } from "framer-motion";
import { SPENDS, SPEND_TOTALS } from "../data/spends";
import { formatINRk } from "../lib/format";
import StatsTicker from "./StatsTicker";
import PaymentFlow from "./PaymentFlow";
import PassportStamp from "./PassportStamp";

export default function Travelers() {
  const owedToAyushman = SPEND_TOTALS.ayushman - SPEND_TOTALS.dhwani;
  const settlementText =
    owedToAyushman > 0
      ? `Dhwani owes Ayushman ${formatINRk(Math.abs(owedToAyushman))}`
      : owedToAyushman < 0
        ? `Ayushman owes Dhwani ${formatINRk(Math.abs(owedToAyushman))}`
        : "All square.";

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="font-display italic text-sepia tracking-[0.3em] uppercase text-xs mb-3">
          who's paying for what
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-ink leading-tight">
          A trip is two purses,
          <br />
          <em>quietly settling up.</em>
        </h2>
      </motion.div>

      {/* Big two-column total */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonCard
          name="Ayushman"
          total={SPEND_TOTALS.ayushman}
          accent="#1f3a5f"
          spends={SPENDS.filter((s) => s.ayushman > 0)}
          getValue={(s) => s.ayushman}
        />
        <PersonCard
          name="Dhwani"
          total={SPEND_TOTALS.dhwani}
          accent="#8b3a3a"
          spends={SPENDS.filter((s) => s.dhwani > 0)}
          getValue={(s) => s.dhwani}
        />
      </div>

      {/* Sankey-ish payment flow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="font-display text-3xl md:text-4xl text-ink mb-2">Money in motion</h3>
        <p className="font-display italic text-ink-soft mb-6">
          Each ribbon is a payment made so far, sized by amount, flowing from purse to category.
        </p>
        <div className="bg-paper-dark/40 border border-ink-faded/30 rounded-md p-4 md:p-6">
          <PaymentFlow />
        </div>
      </motion.div>

      {/* Settlement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="inline-block bg-paper-dark/60 border-2 border-dashed border-ink-faded/50 rounded-md px-10 py-8">
          <p className="font-display italic text-sepia tracking-[0.3em] uppercase text-xs mb-3">
            running settlement
          </p>
          <p className="font-display text-4xl md:text-5xl text-ink mb-2">
            <StatsTicker value={SPEND_TOTALS.total} prefix="₹" suffix="k" decimals={1} />
            <span className="text-ink-faded text-2xl"> already paid</span>
          </p>
          <p className="font-display italic text-xl text-burgundy">{settlementText}</p>
        </div>
      </motion.div>

      <PassportStamp />
    </section>
  );
}

interface PersonCardProps {
  name: string;
  total: number;
  accent: string;
  spends: typeof SPENDS;
  getValue: (s: typeof SPENDS[number]) => number;
}

function PersonCard({ name, total, accent, spends, getValue }: PersonCardProps) {
  const max = Math.max(...spends.map(getValue));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="bg-paper-dark/50 border border-ink-faded/30 rounded-md p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: accent }} />
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-display text-3xl text-ink">{name}</h3>
        <div className="font-numeral text-2xl" style={{ color: accent }}>
          <StatsTicker value={total} prefix="₹" suffix="k" decimals={1} />
        </div>
      </div>
      <p className="font-display italic text-ink-faded text-sm mb-5">
        Paid {spends.length} times
      </p>
      <ul className="space-y-2">
        {spends.map((s, i) => {
          const v = getValue(s);
          const w = (v / max) * 100;
          return (
            <li key={s.label + i}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-body text-ink">{s.label}</span>
                <span className="font-numeral text-ink-soft">{formatINRk(v)}</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${w}%` }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="h-1 rounded-full mt-1 opacity-70"
                style={{ background: accent }}
              />
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
