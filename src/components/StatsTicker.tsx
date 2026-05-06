import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface Props {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function StatsTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`font-numeral ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
