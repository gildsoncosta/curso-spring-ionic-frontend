/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/models/cart-items';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';

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
    public pedidoService: PedidoService) {

    console.log('Construtor orderconfirmation.page:', this._router.snapshot.paramMap['params']['ped']);
    this.pedido = JSON.parse(this._router.snapshot.paramMap['params']['ped']);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.route.navigateByUrl('homePage');
      });
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
}
