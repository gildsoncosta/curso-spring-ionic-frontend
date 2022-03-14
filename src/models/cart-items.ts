/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { ProdutoDTO } from "./produto.dto";

export interface CartItem {
    quantidade: number,
    // eslint-disable-next-line @typescript-eslint/member-delimiter-style
    produto: ProdutoDTO
}
