// Dados mockados para demonstração ao cliente.
// ⚠️ Nomes e telefones aqui são ilustrativos — não são pacientes reais.

export type EstadoPaciente =
  | "NOVO"
  | "ATIVO"
  | "ESTAVEL"
  | "SEM_RESPOSTA"
  | "TROCA_PRODUTO"
  | "DESISTENTE";

export type StatusEpisodio = "PENDENTE" | "RESPONDIDO" | "EXPIRADO" | "NAO_RESPONDIDO";

export type StatusPedido =
  | "EM_PRODUCAO"
  | "EM_TRANSPORTE"
  | "ENTREGUE"
  | "F1_RESPONDIDO"
  | "AGUARDANDO_F2"
  | "ESTABILIZADO";

export interface Paciente {
  token: string;
  nome: string; // ⚠️ vem da D9 em runtime, aqui é só mock
  telefone: string;
  estado: EstadoPaciente;
  produto_atual: string;
  prescritor: string;
  prescritor_uf: string;
  ultimo_pedido: string; // ISO
  proximo_form?: string; // ISO
  alertas: number;
  patologias: string[];
  ciclo_atual: number;
}

export interface Pedido {
  orderId: string;
  paciente_token: string;
  paciente_nome: string;
  produto: string;
  status: StatusPedido;
  data_pedido: string;
  data_entrega?: string;
  prescritor: string;
}

export interface Alerta {
  id: string;
  paciente_token: string;
  paciente_nome: string;
  tipo: "ABANDONO" | "PIORA" | "EFEITO_GRAVE" | "INSATISFACAO" | "INTERVALO_LONGO" | "SUBDOSAGEM";
  severidade: "alta" | "media" | "baixa";
  mensagem: string;
  data: string;
}

export const mockPacientes: Paciente[] = [
  {
    token: "a3f8c2d1-9e4b-4a5c-8d12-7f9a3e6d1b2c",
    nome: "Emília Alcântara",
    telefone: "+55 61 99943-2221",
    estado: "ATIVO",
    produto_atual: "P1 — Full Spectrum 3000mg CBD + 75mg THC",
    prescritor: "Caliandra Pinheiro Alves de Melo",
    prescritor_uf: "AP",
    ultimo_pedido: new Date(Date.now() - 2 * 86400000).toISOString(),
    proximo_form: new Date(Date.now() + 13 * 86400000).toISOString(),
    alertas: 0,
    patologias: ["Ansiedade", "Insônia"],
    ciclo_atual: 3,
  },
  {
    token: "b4e9d3c2-1f5a-4b6d-9e23-8a0b4f7e2c3d",
    nome: "Roberto Mendes Silva",
    telefone: "+55 11 98876-5432",
    estado: "ESTAVEL",
    produto_atual: "P5 — Broad Spectrum 3000mg CBD (Zero THC)",
    prescritor: "Marcos Oliveira Santos",
    prescritor_uf: "SP",
    ultimo_pedido: new Date(Date.now() - 45 * 86400000).toISOString(),
    proximo_form: new Date(Date.now() + 120 * 86400000).toISOString(),
    alertas: 0,
    patologias: ["Dor crônica"],
    ciclo_atual: 8,
  },
  {
    token: "c5f0e4d3-2a6b-5c7e-0f34-9b1c5a8f3d4e",
    nome: "Maria Auxiliadora Pereira",
    telefone: "+55 21 99765-1234",
    estado: "SEM_RESPOSTA",
    produto_atual: "P3 — Full Spectrum 600mg CBD + 600mg THC",
    prescritor: "Antônio Carlos Vieira",
    prescritor_uf: "RJ",
    ultimo_pedido: new Date(Date.now() - 22 * 86400000).toISOString(),
    proximo_form: new Date(Date.now() - 7 * 86400000).toISOString(),
    alertas: 2,
    patologias: ["Fibromialgia", "Depressão"],
    ciclo_atual: 4,
  },
  {
    token: "d6a1f5e4-3b7c-6d8f-1a45-0c2d6b9a4e5f",
    nome: "João Pedro Oliveira",
    telefone: "+55 31 98654-9876",
    estado: "NOVO",
    produto_atual: "P2 — Full Spectrum 3000mg CBD + 1000mg CBG",
    prescritor: "Fernanda Souza Costa",
    prescritor_uf: "MG",
    ultimo_pedido: new Date(Date.now() - 1 * 86400000).toISOString(),
    proximo_form: new Date(Date.now() - 0).toISOString(),
    alertas: 0,
    patologias: ["TDAH"],
    ciclo_atual: 1,
  },
  {
    token: "e7b2a6f5-4c8d-7e9a-2b56-1d3e7c0b5f6a",
    nome: "Ana Carolina Ribeiro",
    telefone: "+55 47 99543-8765",
    estado: "ATIVO",
    produto_atual: "P4 — Full Spectrum 2000mg CBD + 1000mg CBN",
    prescritor: "Júlio César Almeida",
    prescritor_uf: "SC",
    ultimo_pedido: new Date(Date.now() - 8 * 86400000).toISOString(),
    proximo_form: new Date(Date.now() + 7 * 86400000).toISOString(),
    alertas: 1,
    patologias: ["Insônia", "Bruxismo"],
    ciclo_atual: 2,
  },
  {
    token: "f8c3b7a6-5d9e-8f0b-3c67-2e4f8d1c6a7b",
    nome: "Paulo Henrique Costa",
    telefone: "+55 85 98432-5678",
    estado: "TROCA_PRODUTO",
    produto_atual: "P6 — Broad Spectrum 3000mg CBD + 1000mg CBG",
    prescritor: "Beatriz Lima Barros",
    prescritor_uf: "CE",
    ultimo_pedido: new Date(Date.now() - 4 * 86400000).toISOString(),
    proximo_form: new Date(Date.now() + 11 * 86400000).toISOString(),
    alertas: 0,
    patologias: ["Enxaqueca", "Ansiedade"],
    ciclo_atual: 1,
  },
  {
    token: "a9d4c8b7-6e0f-9a1c-4d78-3f5a9e2d7b8c",
    nome: "Larissa Fernandes Souza",
    telefone: "+55 51 97321-4321",
    estado: "DESISTENTE",
    produto_atual: "P1 — Full Spectrum 3000mg CBD + 75mg THC",
    prescritor: "Roberto Tavares Júnior",
    prescritor_uf: "RS",
    ultimo_pedido: new Date(Date.now() - 60 * 86400000).toISOString(),
    alertas: 0,
    patologias: ["Depressão"],
    ciclo_atual: 1,
  },
  {
    token: "b0e5d9c8-7f1a-0b2d-5e89-4a6b0f3e8c9d",
    nome: "Carlos Eduardo Martins",
    telefone: "+55 71 96210-3210",
    estado: "ATIVO",
    produto_atual: "P7 — CBN Isolado 1200mg (Zero THC)",
    prescritor: "Luiza Pereira Castro",
    prescritor_uf: "BA",
    ultimo_pedido: new Date(Date.now() - 14 * 86400000).toISOString(),
    proximo_form: new Date(Date.now() + 1 * 86400000).toISOString(),
    alertas: 0,
    patologias: ["Insônia"],
    ciclo_atual: 5,
  },
];

export const mockPedidos: Pedido[] = [
  { orderId: "PED-562", paciente_token: mockPacientes[3].token, paciente_nome: mockPacientes[3].nome, produto: "P2", status: "EM_TRANSPORTE", data_pedido: new Date(Date.now() - 3 * 86400000).toISOString(), prescritor: "Fernanda Souza Costa" },
  { orderId: "PED-561", paciente_token: mockPacientes[5].token, paciente_nome: mockPacientes[5].nome, produto: "P6", status: "ENTREGUE", data_pedido: new Date(Date.now() - 5 * 86400000).toISOString(), data_entrega: new Date(Date.now() - 1 * 86400000).toISOString(), prescritor: "Beatriz Lima Barros" },
  { orderId: "PED-560", paciente_token: mockPacientes[0].token, paciente_nome: mockPacientes[0].nome, produto: "P1", status: "F1_RESPONDIDO", data_pedido: new Date(Date.now() - 7 * 86400000).toISOString(), data_entrega: new Date(Date.now() - 2 * 86400000).toISOString(), prescritor: "Caliandra Pinheiro" },
  { orderId: "PED-559", paciente_token: mockPacientes[4].token, paciente_nome: mockPacientes[4].nome, produto: "P4", status: "AGUARDANDO_F2", data_pedido: new Date(Date.now() - 14 * 86400000).toISOString(), data_entrega: new Date(Date.now() - 8 * 86400000).toISOString(), prescritor: "Júlio César Almeida" },
  { orderId: "PED-558", paciente_token: mockPacientes[7].token, paciente_nome: mockPacientes[7].nome, produto: "P7", status: "AGUARDANDO_F2", data_pedido: new Date(Date.now() - 18 * 86400000).toISOString(), data_entrega: new Date(Date.now() - 14 * 86400000).toISOString(), prescritor: "Luiza Pereira Castro" },
  { orderId: "PED-557", paciente_token: mockPacientes[1].token, paciente_nome: mockPacientes[1].nome, produto: "P5", status: "ESTABILIZADO", data_pedido: new Date(Date.now() - 50 * 86400000).toISOString(), data_entrega: new Date(Date.now() - 45 * 86400000).toISOString(), prescritor: "Marcos Oliveira" },
  { orderId: "PED-556", paciente_token: mockPacientes[2].token, paciente_nome: mockPacientes[2].nome, produto: "P3", status: "AGUARDANDO_F2", data_pedido: new Date(Date.now() - 25 * 86400000).toISOString(), data_entrega: new Date(Date.now() - 22 * 86400000).toISOString(), prescritor: "Antônio Carlos Vieira" },
  { orderId: "PED-555", paciente_token: "novo-mock-token", paciente_nome: "Lucas Silveira Pinto", produto: "P1", status: "EM_PRODUCAO", data_pedido: new Date(Date.now() - 1 * 86400000).toISOString(), prescritor: "Patricia Mendonça" },
];

export const mockAlertas: Alerta[] = [
  {
    id: "alert-001",
    paciente_token: mockPacientes[2].token,
    paciente_nome: mockPacientes[2].nome,
    tipo: "ABANDONO",
    severidade: "alta",
    mensagem: "2 formulários consecutivos sem resposta",
    data: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "alert-002",
    paciente_token: mockPacientes[2].token,
    paciente_nome: mockPacientes[2].nome,
    tipo: "INTERVALO_LONGO",
    severidade: "media",
    mensagem: "Mais de 30 dias sem novo pedido",
    data: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "alert-003",
    paciente_token: mockPacientes[4].token,
    paciente_nome: mockPacientes[4].nome,
    tipo: "EFEITO_GRAVE",
    severidade: "alta",
    mensagem: "Efeito adverso reportado com intensidade 8/10",
    data: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
];

// KPIs derivados
export function getKPIs() {
  const total = mockPacientes.length;
  const ativos = mockPacientes.filter((p) => p.estado === "ATIVO").length;
  const novos = mockPacientes.filter((p) => p.estado === "NOVO").length;
  const estaveis = mockPacientes.filter((p) => p.estado === "ESTAVEL").length;
  const semResposta = mockPacientes.filter((p) => p.estado === "SEM_RESPOSTA").length;
  const desistentes = mockPacientes.filter((p) => p.estado === "DESISTENTE").length;
  const alertasAltos = mockAlertas.filter((a) => a.severidade === "alta").length;
  return { total, ativos, novos, estaveis, semResposta, desistentes, alertasAltos };
}

// Série temporal mockada (8 semanas)
export const mockEvolucaoSemanal = [
  { semana: "S1", novos: 2, ativos: 4, estaveis: 0 },
  { semana: "S2", novos: 1, ativos: 5, estaveis: 0 },
  { semana: "S3", novos: 3, ativos: 5, estaveis: 1 },
  { semana: "S4", novos: 1, ativos: 6, estaveis: 1 },
  { semana: "S5", novos: 2, ativos: 5, estaveis: 2 },
  { semana: "S6", novos: 1, ativos: 4, estaveis: 2 },
  { semana: "S7", novos: 2, ativos: 5, estaveis: 2 },
  { semana: "S8", novos: 1, ativos: 4, estaveis: 2 },
];
