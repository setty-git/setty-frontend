import Link from "next/link";
import { Search, Filter, AlertCircle } from "lucide-react";
import { EstadoBadge } from "@/components/status-badge";
import { mockPacientes } from "@/lib/mock-data";
import { formatPhoneMasked, relativeTime, shortToken } from "@/lib/utils";

export default function PacientesPage() {
  return (
    <div className="p-8 max-w-7xl">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            {mockPacientes.length} pacientes cadastrados no programa
          </p>
        </div>
        <button className="bg-[var(--color-brand-400)] hover:bg-[var(--color-brand-500)] text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          Exportar lista
        </button>
      </header>

      {/* Filtros */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            type="text"
            placeholder="Buscar por nome, token ou prescritor..."
            className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-400)]"
          />
        </div>
        <button className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] rounded-lg px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors">
          <Filter size={16} />
          Filtros
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-xs text-[var(--color-text-muted)] uppercase tracking-wide">
                <th className="px-6 py-3 text-left font-medium">Paciente</th>
                <th className="px-6 py-3 text-left font-medium">Telefone</th>
                <th className="px-6 py-3 text-left font-medium">Patologias</th>
                <th className="px-6 py-3 text-left font-medium">Produto</th>
                <th className="px-6 py-3 text-left font-medium">Estado</th>
                <th className="px-6 py-3 text-left font-medium">Último pedido</th>
                <th className="px-6 py-3 text-left font-medium">Próximo form</th>
                <th className="px-6 py-3 text-left font-medium">Alertas</th>
              </tr>
            </thead>
            <tbody>
              {mockPacientes.map((p) => (
                <tr
                  key={p.token}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link href={`/pacientes/${p.token}`} className="block hover:text-[var(--color-brand-400)]">
                      <div className="font-medium">{p.nome}</div>
                      <div className="text-xs font-mono text-[var(--color-text-muted)] mt-0.5">
                        {shortToken(p.token)}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-[var(--color-text-secondary)]">
                    {formatPhoneMasked(p.telefone)}
                  </td>
                  <td className="px-6 py-4 text-xs text-[var(--color-text-secondary)]">
                    {p.patologias.join(" · ")}
                  </td>
                  <td className="px-6 py-4 text-xs text-[var(--color-text-secondary)] max-w-[180px] truncate">
                    {p.produto_atual}
                  </td>
                  <td className="px-6 py-4">
                    <EstadoBadge estado={p.estado} />
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">
                    {relativeTime(p.ultimo_pedido)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">
                    {p.proximo_form ? relativeTime(p.proximo_form) : "—"}
                  </td>
                  <td className="px-6 py-4">
                    {p.alertas > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-danger)]/10 text-[var(--color-danger)] text-xs font-medium">
                        <AlertCircle size={12} /> {p.alertas}
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--color-text-muted)]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
