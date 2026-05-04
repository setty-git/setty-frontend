import Link from "next/link";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { mockAlertas } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

const sevConfig = {
  alta: {
    icon: AlertTriangle,
    color: "text-[var(--color-danger)]",
    bg: "bg-[var(--color-danger)]/10",
    border: "border-[var(--color-danger)]/30",
    label: "Alta",
  },
  media: {
    icon: AlertCircle,
    color: "text-[var(--color-warning)]",
    bg: "bg-[var(--color-warning)]/10",
    border: "border-[var(--color-warning)]/30",
    label: "Média",
  },
  baixa: {
    icon: Info,
    color: "text-[var(--color-info)]",
    bg: "bg-[var(--color-info)]/10",
    border: "border-[var(--color-info)]/30",
    label: "Baixa",
  },
};

export default function AlertasPage() {
  return (
    <div className="p-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Alertas</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Eventos clínicos e operacionais que demandam atenção da equipe
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {(["alta", "media", "baixa"] as const).map((sev) => {
          const cfg = sevConfig[sev];
          const Icon = cfg.icon;
          const count = mockAlertas.filter((a) => a.severidade === sev).length;
          return (
            <div
              key={sev}
              className={`border ${cfg.border} ${cfg.bg} rounded-xl p-4 flex items-center gap-3`}
            >
              <Icon size={24} className={cfg.color} />
              <div>
                <div className={`text-2xl font-bold ${cfg.color}`}>{count}</div>
                <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">
                  Severidade {cfg.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {mockAlertas.map((a) => {
          const cfg = sevConfig[a.severidade];
          const Icon = cfg.icon;
          return (
            <div
              key={a.id}
              className={`bg-[var(--color-bg-elevated)] border ${cfg.border} rounded-xl p-5 flex items-start gap-4 hover:bg-[var(--color-bg-hover)] transition-colors`}
            >
              <div className={`${cfg.bg} ${cfg.color} p-2.5 rounded-lg`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
                    {a.tipo.replace("_", " ")}
                  </span>
                  <span className={`text-xs ${cfg.color} font-semibold`}>· {cfg.label}</span>
                </div>
                <Link
                  href={`/pacientes/${a.paciente_token}`}
                  className="text-base font-medium hover:text-[var(--color-brand-400)] transition-colors"
                >
                  {a.paciente_nome}
                </Link>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{a.mensagem}</p>
                <div className="text-xs text-[var(--color-text-muted)] mt-2">{relativeTime(a.data)}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-xs bg-[var(--color-bg-hover)] hover:bg-[var(--color-border)] px-3 py-2 rounded-lg transition-colors">
                  Ver paciente
                </button>
                <button className="text-xs bg-[var(--color-brand-400)] hover:bg-[var(--color-brand-500)] text-black px-3 py-2 rounded-lg font-semibold transition-colors">
                  Resolver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
