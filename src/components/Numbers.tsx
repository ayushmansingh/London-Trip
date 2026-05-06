import BudgetTreemap from "./BudgetTreemap";
import StayNightStrip from "./StayNightStrip";
import RailNetwork from "./RailNetwork";
import DailySpendChart from "./DailySpendChart";
import TourCards from "./TourCards";
import { motion } from "framer-motion";
import { BUDGET_TOTAL } from "../data/budget";
import { formatINRk, pct } from "../lib/format";

export default function Numbers() {
  const remaining = BUDGET_TOTAL.budgeted - BUDGET_TOTAL.actual;
  const bookedPct = pct(BUDGET_TOTAL.actual, BUDGET_TOTAL.budgeted);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16 space-y-20">
      <Intro remaining={remaining} bookedPct={bookedPct} />

      <ChartBlock title="Where the money will go" subtitle="Budgeted versus what's already been booked, every category drawn to scale.">
        <BudgetTreemap />
      </ChartBlock>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
        <ChartBlock title="Each night, in ink" subtitle="Stay cost per night — the dashed mark is what we'd budgeted; bars are what's locked in.">
          <StayNightStrip />
        </ChartBlock>
        <ChartBlock title="The Rails" subtitle="Eleven legs. Roughly two thousand kilometres. One Railcard.">
          <RailNetwork />
        </ChartBlock>
      </div>

      <ChartBlock title="Money over time" subtitle="How spending will accrue, day by day, against the budgeted trajectory.">
        <DailySpendChart />
      </ChartBlock>

      <ChartBlock title="The Tours" subtitle="Tickets in hand. Boots, viaducts, and an early-morning ferry to Skye.">
        <TourCards />
      </ChartBlock>
    </section>
  );
}

function Intro({ remaining, bookedPct }: { remaining: number; bookedPct: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto text-center"
    >
      <p className="font-display italic text-sepia tracking-[0.3em] uppercase text-xs mb-3">
        the ledger, so far
      </p>
      <h2 className="font-display text-5xl md:text-6xl text-ink leading-tight">
        <em className="text-forest">{bookedPct} of the budget</em>
        <br />
        is already locked in.
      </h2>
      <p className="font-body italic text-lg text-ink-soft mt-5">
        That leaves {formatINRk(remaining)} to spend on the road — most of it for
        food, transport, and attractions, paid in cash, in coffee shops,
        between trains.
      </p>
    </motion.div>
  );
}

function ChartBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-6">
        <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-display italic text-ink-soft text-base mt-1">{subtitle}</p>
        )}
      </div>
      <div className="bg-paper-dark/40 border border-ink-faded/30 rounded-md p-4 md:p-6">
        {children}
      </div>
    </motion.div>
  );
}
