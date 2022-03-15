/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public route: Router,
    public cartService: CartService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      //console.log('mostrando email em ionViewDidEnter: ', localUser.email);
      //this.email = JSON.stringify(localUser.email);
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //console.log(response);
          this.items = response['enderecos'];

          const cart = this.cartService.getCart();

          this.pedido = {
            cliente:{id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }
        },
        error => {
            this.route.navigateByUrl('folder/Inbox');
        });
    }
    else {
      this.route.navigateByUrl('homePage');
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id}
    console.log(this.pedido);
  }

}
