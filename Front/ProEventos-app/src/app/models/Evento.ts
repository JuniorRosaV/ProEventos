import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede-social";
import { Lote } from "./lote";

export interface Evento {
  id: number;
  tema: string;
  descricao: string;
  local: string;
  dataEvento: string;      
  dataEventoDate?: Date;   
  horario: string;
  qtdPessoas: number;
  maxPessoas: number;
  categoria: string;
  imagemUrl: string;
  telefone: string;
  email: string;
  visualizacoes: number;
  TodaDescricao: string;
  lotes: Lote[];
  redesSociais?: RedeSocial[];
  palestrantesEventos?: Palestrante[];
}

