import Link from "next/link";
import { Users, Activity, CheckCircle2, AlertTriangle, UserPlus, UserMinus, ArrowRight } from "lucide-react";
import { KPICard } from "@/components/kpi-card";
import { EstadoBadge, PedidoBadge } from "@/components/status-badge";
import { mockPacientes, mockPedidos, mockAlertas, getKPIs, mockEvolucaoSemanal } from "@/lib/mock-data";
import { relativeTime, shortToken } from "@/lib/utils";

export default function DashboardPage() {
  const kpi = getKPIs();
  const ultimasEntregas = mockPedidos
    .filter((p) => p.data_entrega)
    .sort((a, b) => (b.data_entrega! > a.data_entrega! ? 1 : -1))
    .slice(0, 5);

  // Para o gráfico SVG simples
  const maxAtivos = Math.max(...mockEvolucaoSemanal.map((s) => s.ativos + s.estaveis + s.novos));

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Dashboard</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Visão geral do programa de farmacovigilância
        </p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <KPICard label="Pacientes ativos" value={kpi.ativos} icon={Activity} tone="brand" />
        <KPICard label="Novos (em F1)" value={kpi.novos} icon={UserPlus} tone="default" />
        <KPICard label="Estáveis" value={kpi.estaveis} icon={CheckCircle2} tone="success" />
        <KPICard label="Sem resposta" value={kpi.semResposta} icon={AlertTriangle} tone="warning" />
        <KPICard label="Desistentes" value={kpi.desistentes} icon={UserMinus} tone="default" hint="acumulado" />
        <KPICard label="Alertas críticos" value={kpi.alertasAltos} icon={AlertTriangle} tone="danger" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de evolução semanal */}
        <div className="lg:col-span-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Evolução de pacientes</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Últimas 8 semanas</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[var(--color-brand-400)]"></span>
                Novos
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[var(--color-info)]"></span>
                Ativos
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[var(--color-success)]"></span>
                Estáveis
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {mockEvolucaoSemanal.map((s) => {
              const total = s.novos + s.ativos + s.estaveis;
              const h = (total / maxAtivos) * 100;
              return (
                <div key={s.semana} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col-reverse" style={{ height: `${h}%` }}>
                    <div
                      className="bg-[var(--color-brand-400)] rounded-t-sm"
                      style={{ height: `${(s.novos / total) * 100}%` }}
                    />
                    <div
                      className="bg-[var(--color-info)]"
                      style={{ height: `${(s.ativos / total) * 100}%` }}
                    />
                    <div
                      className="bg-[var(--color-success)] rounded-t-sm"
                      style={{ height: `${(s.estaveis / total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">{s.semana}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alertas recentes */}
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Alertas recentes</h2>
            <Link
              href="/alertas"
              className="text-xs text-[var(--color-brand-400)] hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {mockAlertas.map((a) => (
              <div
                key={a.id}
                className="p-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      a.severidade === "alta"
                        ? "bg-[var(--color-danger)]"
                        : a.severidade === "media"
                        ? "bg-[var(--color-warning)]"
                        : "bg-[var(--color-info)]"
                    }`}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                    {a.tipo.replace("_", " ")}
                  </span>
                </div>
                <div className="text-sm text-[var(--color-text-primary)]">{a.paciente_nome}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">{a.mensagem}</div>
                <div className="text-[10px] text-[var(--color-text-muted)] mt-1">{relativeTime(a.data)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Últimas entregas */}
      <section className="mt-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold">Últimas entregas</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Pedidos com status atualizado nas últimas semanas</p>
          </div>
          <Link
            href="/pedidos"
            className="text-xs text-[var(--color-brand-400)] hover:underline flex items-center gap-1"
          >
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-[var(--color-border)] text-xs text-[var(--color-text-muted)] uppercase tracking-wide">
                <th className="px-6 py-3 text-left font-medium">Pedido</th>
                <th className="px-6 py-3 text-left font-medium">Paciente</th>
                <th className="px-6 py-3 text-left font-medium">Produto</th>
                <th className="px-6 py-3 text-left font-medium">Prescritor</th>
                <th className="px-6 py-3 text-left font-medium">Entregue</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ultimasEntregas.map((p) => (
                <tr
                  key={p.orderId}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-mono text-[var(--color-text-secondary)]">{p.orderId}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium">{p.paciente_nome}</div>
                    <div className="text-xs font-mono text-[var(--color-text-muted)]">
                      {shortToken(p.paciente_token)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{p.produto}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{p.prescritor}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">
                    {p.data_entrega ? relativeTime(p.data_entrega) : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <PedidoBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick view: pacientes ativos */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[var(--color-brand-400)]" />
              <h2 className="text-lg font-semibold">Pacientes em destaque</h2>
            </div>
            <Link
              href="/pacientes"
              className="text-xs text-[var(--color-brand-400)] hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {mockPacientes.slice(0, 4).map((p) => (
              <Link
                key={p.token}
                href={`/pacientes/${p.token}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
              >
                <div>
                  <div className="text-sm font-medium">{p.nome}</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {p.patologias.join(" · ")} · ciclo {p.ciclo_atual}
                  </div>
                </div>
                <EstadoBadge estado={p.estado} />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Resumo do programa</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-secondary)]">Total de pacientes cadastrados</span>
              <span className="text-lg font-bold">{kpi.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-secondary)]">Taxa de adesão</span>
              <span className="text-lg font-bold text-[var(--color-success)]">
                {Math.round(((kpi.ativos + kpi.estaveis) / kpi.total) * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-secondary)]">Taxa de estabilização</span>
              <span className="text-lg font-bold text-[var(--color-brand-400)]">
                {Math.round((kpi.estaveis / kpi.total) * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-secondary)]">Formulários respondidos (mês)</span>
              <span className="text-lg font-bold">23</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-text-secondary)]">Próximo relatório mensal</span>
              <span className="text-sm font-medium text-[var(--color-brand-400)]">em 12 dias</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
