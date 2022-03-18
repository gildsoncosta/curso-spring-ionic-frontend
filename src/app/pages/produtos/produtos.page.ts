/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
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

  private categoria_id: string;

  constructor(
    private route: Router,
    public produtoService: ProdutoService,
    private _router: ActivatedRoute,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    this.categoria_id = this._router.snapshot.paramMap.get('categoria_id');
    //console.log('this._router.snapshot.paramMap.get: ', this.categoria_id);
    this.produtoService.findByCategoria(this.categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadingController.dismiss();
        this.loadImageUrls();
      },
        error => { this.route.navigateByUrl('categorias'); });
  }

  loadImageUrls() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  showDetail(produtoId: string) {
    this.route.navigate(['produto-detail', { produto_id: produtoId }]);
  }

  async presentLoading() {
    const loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde ...',
      duration: 1500
    });
    await loader.present();
    const { role, data } = await loader.onDidDismiss();
    //console.log('Loading dismissed!');
    return loader;
  }

  doRefresh(event) {
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}
