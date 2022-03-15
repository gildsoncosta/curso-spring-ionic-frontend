/* eslint-disable @typescript-eslint/quotes */
import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id: string;
    nome: string;
    estado?: EstadoDTO;
};
