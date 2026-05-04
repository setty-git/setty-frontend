import { FileText, Download, Calendar } from "lucide-react";
import { mockPacientes } from "@/lib/mock-data";

const meses = ["Mar/2026", "Fev/2026", "Jan/2026", "Dez/2025"];

export default function RelatoriosPage() {
  return (
    <div className="p-8 max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Histórico de relatórios mensais gerados por IA e enviados aos prescritores
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Calendar size={16} /> Filtrar período
          </button>
          <button className="bg-[var(--color-brand-400)] hover:bg-[var(--color-brand-500)] text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Gerar relatório agora
          </button>
        </div>
      </header>

      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-brand-400)]/30 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-[var(--color-brand-400)]" />
              <span className="text-xs uppercase tracking-wide text-[var(--color-brand-400)] font-semibold">
                Próximo lote
              </span>
            </div>
            <h2 className="text-lg font-semibold">Relatórios de Maio/2026</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Geração agendada para 1º de junho às 8h · {mockPacientes.filter((p) => p.estado === "ATIVO" || p.estado === "ESTAVEL").length}{" "}
              pacientes elegíveis
            </p>
          </div>
          <div className="text-3xl font-bold text-[var(--color-brand-400)]">12d</div>
        </div>
      </div>

      <div className="space-y-3">
        {meses.map((mes, i) => (
          <div
            key={mes}
            className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--color-brand-400)]/10 text-[var(--color-brand-400)] p-2 rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{mes}</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {6 - i} relatórios enviados · {7 - i} pacientes elegíveis
                  </p>
                </div>
              </div>
              <button className="text-xs bg-[var(--color-bg-hover)] hover:bg-[var(--color-border)] px-3 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Download size={14} /> Baixar todos (PDF)
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 border-t border-[var(--color-border)]">
              {mockPacientes
                .filter((p) => p.estado === "ATIVO" || p.estado === "ESTAVEL")
                .slice(0, 3 + i)
                .map((p) => (
                  <div
                    key={p.token}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
                  >
                    <div className="text-sm">
                      <div className="font-medium">{p.nome}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">Dr. {p.prescritor}</div>
                    </div>
                    <button className="text-[var(--color-brand-400)] hover:text-[var(--color-brand-500)]">
                      <Download size={14} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
