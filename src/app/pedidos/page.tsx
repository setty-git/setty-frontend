import { mockPedidos } from "@/lib/mock-data";
import type { StatusPedido } from "@/lib/mock-data";
import { relativeTime, shortToken } from "@/lib/utils";
import { Package, Truck, CheckCircle2, FileText, Clock, Award } from "lucide-react";

const colunas: Array<{ status: StatusPedido; label: string; icon: typeof Package; color: string }> = [
  { status: "EM_PRODUCAO", label: "Em produção", icon: Package, color: "text-[var(--color-text-muted)]" },
  { status: "EM_TRANSPORTE", label: "Em transporte", icon: Truck, color: "text-[var(--color-info)]" },
  { status: "ENTREGUE", label: "Entregue · F1 enviado", icon: CheckCircle2, color: "text-[var(--color-brand-400)]" },
  { status: "F1_RESPONDIDO", label: "F1 respondido", icon: FileText, color: "text-[var(--color-success)]" },
  { status: "AGUARDANDO_F2", label: "Aguardando F2", icon: Clock, color: "text-[var(--color-warning)]" },
  { status: "ESTABILIZADO", label: "Estabilizado", icon: Award, color: "text-[var(--color-success)]" },
];

export default function PedidosPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Acompanhamento de cada pedido entregue ao paciente, do produto ao estado clínico
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {colunas.map((col) => {
          const pedidos = mockPedidos.filter((p) => p.status === col.status);
          const Icon = col.icon;
          return (
            <div key={col.status} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-4 min-h-[400px]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
                <Icon size={16} className={col.color} />
                <h3 className="text-sm font-semibold flex-1">{col.label}</h3>
                <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full">
                  {pedidos.length}
                </span>
              </div>
              <div className="space-y-2">
                {pedidos.length === 0 ? (
                  <div className="text-xs text-[var(--color-text-muted)] text-center py-8">
                    Nenhum pedido
                  </div>
                ) : (
                  pedidos.map((p) => (
                    <div
                      key={p.orderId}
                      className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-3 hover:border-[var(--color-border-strong)] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-[var(--color-text-muted)]">{p.orderId}</span>
                        <span className="text-xs text-[var(--color-brand-400)] font-semibold">{p.produto}</span>
                      </div>
                      <div className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                        {p.paciente_nome}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] mb-2">
                        {shortToken(p.paciente_token)}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)]">
                        Dr. {p.prescritor}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)] mt-2 pt-2 border-t border-[var(--color-border)]">
                        {p.data_entrega
                          ? `Entregue ${relativeTime(p.data_entrega)}`
                          : `Pedido ${relativeTime(p.data_pedido)}`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
