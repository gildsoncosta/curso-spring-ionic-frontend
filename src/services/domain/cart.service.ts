/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from "@angular/core";
import { Cart } from "src/models/cart";
import { ProdutoDTO } from "src/models/produto.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class CartService {
    constructor(public storage: StorageService) {

    }

    createOrClearCart(): Cart {
        const cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id === produto.id);
        if (position === -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }
}
