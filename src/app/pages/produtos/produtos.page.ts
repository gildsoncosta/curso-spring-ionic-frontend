/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { takeWhile } from 'rxjs/operators';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  [x: string]: any;

  items: ProdutoDTO[];
  parametros: string[];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private categoria_id: string;

  constructor(private route: Router, public produtoService: ProdutoService, private route2: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.sub = this.route2
      .paramMap
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.page = +params['page'] || 0;
        console.log('params',  this.page);
      });


    this.categoria_id = this.produtoService.getCategoria_id();
    console.log('this.produtoService.getCategoria_id()', this.categoria_id);
    this.produtoService.findByCategoria(this.categoria_id)
      .subscribe(response => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.items = response['content'];
      },
        error => { this.route.navigateByUrl('categorias'); });
  }

  /* this.items = [
      {
        id: '1',
        nome: 'Mouse',
        preco: 80.99
      },
      {
        id: '2',
        nome: 'Teclado',
        preco: 80.99
      }
    ];*/
}
