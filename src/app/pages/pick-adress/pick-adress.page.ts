/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {

  items: EnderecoDTO[];

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade: {
          id: "1",
          nome: "Ubelândia",
          estado: {
            id:"1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Alexandre Toledo da Silva",
        numero: "405",
        complemento: "null",
        bairro: "Centro",
        cep: "88933822",
        cidade: {
          id: "3",
          nome: "São Paulo",
          estado: {
            id:"2",
            nome: "São Paulo"
          }
        }
      }
    ];
  }

}
