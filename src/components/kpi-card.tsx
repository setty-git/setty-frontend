import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "default" | "brand" | "success" | "warning" | "danger";
  hint?: string;
}

const tones = {
  default: "text-[var(--color-text-primary)]",
  brand: "text-[var(--color-brand-400)]",
  success: "text-[var(--color-success)]",
  warning: "text-[var(--color-warning)]",
  danger: "text-[var(--color-danger)]",
};

export function KPICard({ label, value, icon: Icon, tone = "default", hint }: KPICardProps) {
  return (
    <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-border-strong)] transition-colors">
      <div className="flex items-start justify-between">
        <div className="text-[var(--color-text-secondary)] text-sm font-medium">{label}</div>
        <Icon size={18} className={cn("opacity-70", tones[tone])} />
      </div>
      <div className={cn("text-3xl font-bold mt-3 leading-none", tones[tone])}>{value}</div>
      {hint && <div className="text-xs text-[var(--color-text-muted)] mt-2">{hint}</div>}
    </div>
  );
}
