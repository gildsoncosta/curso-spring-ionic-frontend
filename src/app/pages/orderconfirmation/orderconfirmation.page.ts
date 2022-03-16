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

  constructor(
    public route: Router,
    private _router: ActivatedRoute,
    public cartService: CartService,
    public clienteService: ClienteService) {

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
}
