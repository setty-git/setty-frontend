import { cn } from "@/lib/utils";
import type { EstadoPaciente, StatusPedido } from "@/lib/mock-data";

const estadoConfig: Record<EstadoPaciente, { label: string; classes: string }> = {
  NOVO: {
    label: "Novo",
    classes: "bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/30",
  },
  ATIVO: {
    label: "Ativo",
    classes: "bg-[var(--color-brand-400)]/10 text-[var(--color-brand-400)] border-[var(--color-brand-400)]/30",
  },
  ESTAVEL: {
    label: "Estável",
    classes: "bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30",
  },
  SEM_RESPOSTA: {
    label: "Sem resposta",
    classes: "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30",
  },
  TROCA_PRODUTO: {
    label: "Troca de produto",
    classes: "bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/30",
  },
  DESISTENTE: {
    label: "Desistente",
    classes: "bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)] border-[var(--color-text-muted)]/30",
  },
};

export function EstadoBadge({ estado }: { estado: EstadoPaciente }) {
  const cfg = estadoConfig[estado];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        cfg.classes,
      )}
    >
      {cfg.label}
    </span>
  );
}

const pedidoConfig: Record<StatusPedido, { label: string; classes: string }> = {
  EM_PRODUCAO: { label: "Em produção", classes: "bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)]" },
  EM_TRANSPORTE: { label: "Em transporte", classes: "bg-[var(--color-info)]/10 text-[var(--color-info)]" },
  ENTREGUE: { label: "Entregue · F1 enviado", classes: "bg-[var(--color-brand-400)]/10 text-[var(--color-brand-400)]" },
  F1_RESPONDIDO: { label: "F1 respondido", classes: "bg-[var(--color-success)]/10 text-[var(--color-success)]" },
  AGUARDANDO_F2: { label: "Aguardando F2", classes: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]" },
  ESTABILIZADO: { label: "Estabilizado", classes: "bg-[var(--color-success)]/10 text-[var(--color-success)]" },
};

export function PedidoBadge({ status }: { status: StatusPedido }) {
  const cfg = pedidoConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", cfg.classes)}>
      {cfg.label}
    </span>
  );
}
