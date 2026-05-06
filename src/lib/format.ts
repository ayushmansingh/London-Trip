/**
 * Format INR thousands as a compact string.
 * 17    → "₹17k"
 * 190.4 → "₹1.9L"  (1 lakh = 100k)
 */
export function formatINRk(n: number, opts: { compact?: boolean } = {}): string {
  const compact = opts.compact ?? true;
  if (!isFinite(n)) return "—";
  if (compact) {
    if (n >= 100) return `₹${(n / 100).toFixed(1)}L`;
    return `₹${n.toFixed(n % 1 === 0 ? 0 : 1)}k`;
  }
  return `₹${(n * 1000).toLocaleString("en-IN")}`;
}

/** Format raw rupees (rail tab uses raw INR). */
export function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function pct(part: number, whole: number): string {
  if (!whole) return "0%";
  return `${Math.round((part / whole) * 100)}%`;
}

/** Haversine in km between two lat/lng points. */
export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
