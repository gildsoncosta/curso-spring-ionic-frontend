import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor() { }

  ionViewWillEnter() {
    this.item = {
      id: '1',
      nome: 'mouse',
      preco: 80.59
    };
  }

  ngOnInit() {
  }

}
