"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, Bell, FileText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/pedidos", label: "Pedidos", icon: Package },
  { href: "/alertas", label: "Alertas", icon: Bell },
  { href: "/relatorios", label: "Relatórios", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[var(--color-bg-elevated)] border-r border-[var(--color-border)] flex flex-col fixed left-0 top-0">
      <div className="px-6 py-6 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-black flex items-center justify-center">
            <Image src="/logo.jpg" alt="Setty" width={40} height={40} className="object-cover" />
          </div>
          <div>
            <div className="text-[var(--color-brand-400)] font-bold text-lg leading-none">setty</div>
            <div className="text-[var(--color-text-muted)] text-xs mt-0.5">Farmacovigilância</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--color-brand-400)]/10 text-[var(--color-brand-400)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]",
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[var(--color-border)] space-y-1">
        <ThemeToggle />
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors">
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
