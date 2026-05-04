import Link from "next/link";
import { ArrowLeft, Phone, Pill, UserCircle, MapPin, Activity, FileText, Send } from "lucide-react";
import { mockPacientes, mockPedidos, mockEvolucaoSemanal } from "@/lib/mock-data";
import { EstadoBadge } from "@/components/status-badge";
import { formatPhoneMasked, relativeTime, shortToken } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function PacienteDetailPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const paciente = mockPacientes.find((p) => p.token === token);
  if (!paciente) notFound();

  const pedidos = mockPedidos.filter((p) => p.paciente_token === token);

  return (
    <div className="p-8 max-w-6xl">
      <Link
        href="/pacientes"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand-400)] mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Voltar para pacientes
      </Link>

      {/* Header */}
      <header className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-[var(--color-brand-400)]/10 text-[var(--color-brand-400)] w-16 h-16 rounded-2xl flex items-center justify-center">
              <UserCircle size={36} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{paciente.nome}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-[var(--color-text-secondary)]">
                <span className="font-mono text-xs">{shortToken(paciente.token, 16)}</span>
                <span>·</span>
                <EstadoBadge estado={paciente.estado} />
                <span>·</span>
                <span>Ciclo {paciente.ciclo_atual}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-[var(--color-bg-hover)] hover:bg-[var(--color-border)] px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Send size={14} /> Reenviar formulário
            </button>
            <button className="bg-[var(--color-brand-400)] hover:bg-[var(--color-brand-500)] text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
              <FileText size={14} /> Gerar relatório
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[var(--color-border)]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              <Phone size={12} /> Contato
            </div>
            <div className="text-sm font-mono">{formatPhoneMasked(paciente.telefone)}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              <Pill size={12} /> Produto
            </div>
            <div className="text-sm">{paciente.produto_atual}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              <MapPin size={12} /> Prescritor
            </div>
            <div className="text-sm">{paciente.prescritor}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{paciente.prescritor_uf}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
              <Activity size={12} /> Patologias
            </div>
            <div className="text-sm">{paciente.patologias.join(", ")}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">Linha do tempo</h2>
          <div className="space-y-5 relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-[var(--color-border)]" />

            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--color-brand-400)]/10 border-2 border-[var(--color-brand-400)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-400)]" />
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">{relativeTime(paciente.ultimo_pedido)}</div>
              <div className="text-sm font-medium">Pedido entregue · {paciente.produto_atual.split(" — ")[0]}</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                Convite F{paciente.ciclo_atual === 1 ? "1" : "2"} enviado via WhatsApp
              </div>
            </div>

            {paciente.ciclo_atual > 1 && (
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--color-success)]/10 border-2 border-[var(--color-success)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mb-1">há 18 dias</div>
                <div className="text-sm font-medium">F{paciente.ciclo_atual - 1} respondido</div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                  Snapshot gerado · evolução +28% vs basal
                </div>
              </div>
            )}

            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--color-info)]/10 border-2 border-[var(--color-info)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-info)]" />
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">há {paciente.ciclo_atual * 15 + 2} dias</div>
              <div className="text-sm font-medium">Admissão (F1)</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                Consentimento aceito · perfil clínico criado
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar com detalhes */}
        <div className="space-y-6">
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-3">Pedidos ({pedidos.length})</h3>
            {pedidos.length === 0 ? (
              <div className="text-xs text-[var(--color-text-muted)]">Nenhum pedido registrado</div>
            ) : (
              <div className="space-y-2">
                {pedidos.map((p) => (
                  <div key={p.orderId} className="text-xs border-b border-[var(--color-border)] last:border-0 pb-2 last:pb-0">
                    <div className="flex justify-between">
                      <span className="font-mono text-[var(--color-text-muted)]">{p.orderId}</span>
                      <span className="text-[var(--color-brand-400)] font-semibold">{p.produto}</span>
                    </div>
                    <div className="text-[var(--color-text-muted)] mt-0.5">{relativeTime(p.data_pedido)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-3">Evolução clínica</h3>
            <div className="text-xs text-[var(--color-text-secondary)] space-y-2">
              <div className="flex justify-between">
                <span>Qualidade do sono</span>
                <span className="text-[var(--color-success)] font-semibold">+42%</span>
              </div>
              <div className="flex justify-between">
                <span>Ansiedade</span>
                <span className="text-[var(--color-success)] font-semibold">-31%</span>
              </div>
              <div className="flex justify-between">
                <span>Qualidade de vida</span>
                <span className="text-[var(--color-success)] font-semibold">+28%</span>
              </div>
              <div className="flex justify-between">
                <span>Energia</span>
                <span className="text-[var(--color-warning)] font-semibold">+8%</span>
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)] mt-2 pt-2 border-t border-[var(--color-border)]">
                ⚠️ Análise sugestiva — validação médica obrigatória
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
