import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Setty — Farmacovigilância",
  description: "Painel de acompanhamento de pacientes em terapia com cannabis medicinal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Script inline rodado antes da hidratação pra evitar flash de tema errado
  const themeInitScript = `
    (function() {
      try {
        var t = localStorage.getItem('setty-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', t);
      } catch(e) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;

  return (
    <html lang="pt-BR" className={`${jakarta.variable} h-full antialiased`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        <Sidebar />
        <main className="ml-64 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
