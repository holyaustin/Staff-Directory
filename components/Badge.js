const VARIANTS = {
  navy: "bg-navy-50 text-navy-700 border-navy-200",
  royal: "bg-royal-500/10 text-royal-700 border-royal-500/30",
  steel: "bg-paper-200 text-steel-600 border-paper-300",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Badge({ children, variant = "navy" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
