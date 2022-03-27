/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Cart } from "src/models/cart";
import { CartItem } from "src/models/cart-items";
import { ProdutoDTO } from "src/models/produto.dto";
import { StorageService } from "./storage.service";

@Injectable()
export class CartService {

    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController,
        public toastController: ToastController) {

    }

    createOrClearCart(): Cart {
        const cart: Cart = { items: [] };
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
            cart.items.push({ quantidade: 1, dataItem: new Date(new Date()), produto: produto });
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id === produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id === produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id === produto.id);
        if (position != -1) {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        let cart = this.getCart();
        let sum = 0;
        for (var i = 0; i < cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }


    tempoLimiteItemPedido(): Cart {
        //const dataAtual = new Date(new Date().getTime());
        const dataAtual = new Date(new Date().getTime());

        let cart = this.getCart();
        let items = cart.items;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            //console.log('dataAtual: ', dataAtual);
            const dataItem = new Date(item.dataItem);
            //console.log('dataItem: ', dataItem);

            const data1 = new Date(dataAtual.getTime()).getTime();
            const data2 = new Date(dataItem.getTime()).getTime();
            const umaHora = 1000 * 60 * 60;
            const diff = (data1 - data2) / umaHora;
            console.log('cart.Service, horas: ', diff);

            const days = ((data1 - data2) / (1000 * 60 * 60 * 24));
            console.log('cart.Service, dias: ', days);

            if ((days >= 1) || (diff > 3 || diff < 0)) {
                this.apresentarToast('Deletou');
                items = this.removeProduto(item.produto).items;
            }
        }

        return this.getCart();
    }

    async apresentarToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 3000,
            color: 'success',
            position: 'middle'
        });
        toast.present();
    }
}
