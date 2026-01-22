import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede-social";
import { Lote } from "./lote";

export interface Evento {
  id: number;
  tema: string;
  local: string;
  dataEvento: string;      // API
  dataEventoDate?: Date;   // Frontend
  qtdPessoas: number;
  imagemUrl: string;
  telefone: string;
  email: string;
  lotes: Lote[];
  redesSociais?: RedeSocial[];
  palestrantesEventos?: Palestrante[];
}

