/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CartItem } from 'src/models/cart-items';
import { ProdutoDTO } from 'src/models/produto.dto';
import { AuthService } from 'src/services/domain/auth.service';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoService } from 'src/services/domain/produto.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    public menuCtrl: MenuController,
    public cartService: CartService,
    public produtoService: ProdutoService,
    private route: Router,
    public auth: AuthService,
    public storage: StorageService,
    public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.close();

    //const cart = this.cartService.getCart();
    const cart = this.cartService.tempoLimiteItemPedido();
    this.items = cart.items;

    this.loadImageUrls();
  }


  loadImageUrls(): void {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
          error => { });
    }
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }
  increaseItem(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }
  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }
  total(): number {
    return this.cartService.total();
  }
  comprarMais() { // era p chamar de goOn()
    this.route.navigateByUrl('categorias');
  }

  checkout() {
    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.auth.refreshToken()
        .subscribe(response => {
          this.auth.successfulLogin(response.headers.get('Authorization'));
          this.route.navigateByUrl('pick-adress');
        },
          error => {
            if (error.status === 403) {
              this.erroAuthenticate('login axpirado', 'Primary');
              this.route.navigateByUrl('homePage');
            }
          });
    } else {
      this.erroAuthenticate('Por favor faça longin antes de finalizar Pedido', 'Warning');
      this.route.navigateByUrl('homePage');
    }
  }

  async erroAuthenticate(texto: string, cor: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'profalert',
      header: 'TudoaKi',
      message: texto,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          id: 'confirm-button',
          /*,
          handler: () => {
            this.route.navigateByUrl('folder/Inbox');
          }*/
        }
      ]
    });

    await alert.present();
  }

}


