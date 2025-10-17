import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede-social";
import { Lote } from "./lote";

export interface Evento {
id: number;
tema: string;
local: string;
dataEvento: Date;
qtdPessoas: number;
imagemUrl: string;
lotes: Lote[];
redesSociais?: RedeSocial[];
palestrantesEventos?: Palestrante[];
}
