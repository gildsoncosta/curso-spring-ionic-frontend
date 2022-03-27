/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartItem } from 'src/models/cart-items';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { AuthService } from 'src/services/domain/auth.service';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.page.html',
  styleUrls: ['./orderconfirmation.page.scss'],
})
export class OrderconfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public route: Router,
    private _router: ActivatedRoute,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService,
    public auth: AuthService,
    public storage: StorageService,
    public alertCtrl: AlertController) {

    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.auth.refreshToken()
        .subscribe(response => {
          this.auth.successfulLogin(response.headers.get('Authorization'));
        },
          error => {
            if (error.status === 403) {
              this.erroAuthenticate('login axpirado', 'Primary');
              this.route.navigateByUrl('homePage');
            }
          });
    } else {
      this.erroAuthenticate('Por favor faça longin antes de Confirmar Pedido', 'Warning');
      this.route.navigateByUrl('homePage');
    }

    if (this._router.snapshot.paramMap['params']['ped']) {
      this.pedido = JSON.parse(this._router.snapshot.paramMap['params']['ped']);
      //console.log('Construtor orderconfirmation.page:', this._router.snapshot.paramMap['params']['ped']);
      console.log('Construtor orderconfirmation.page:', JSON.parse(this._router.snapshot.paramMap['params']['ped']));
    } else {
      this.erroAuthenticate('Pedido não encontrado', 'Warning');
      this.route.navigateByUrl('cart');
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.pedido) {
      //this.cartItems = this.cartService.getCart().items;
      this.cartItems = this.cartService.tempoLimiteItemPedido().items;
      if (!this.cartItems) {
        this.route.navigateByUrl('categorias');
      }

      this.clienteService.findById(this.pedido.cliente.id)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
        },
          error => {
            this.route.navigateByUrl('categorias');
          });
    }
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    const position = list.findIndex(x => x.id === id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  backPedido() {
    this.route.navigateByUrl('cart');
  }

  backCategorias() {
    this.route.navigateByUrl('categorias');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
        this.codpedido = this.extractId(response.headers.get('location'));
        console.log(this.codpedido);
      },
        error => {
          if (error.status === 403) {
            this.route.navigateByUrl('homePage');
          }
        });
  }

  private extractId(location: string): string {
    const position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
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
