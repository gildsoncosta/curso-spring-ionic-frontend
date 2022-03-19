/* eslint-disable @typescript-eslint/no-inferrable-types */
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

  items: ProdutoDTO[] = [];
  page: number = 0;

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
    this.produtoService.findByCategoria(this.categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        //this.loadingController.dismiss();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
      },
        error => { this.route.navigateByUrl('categorias'); });
  }

  loadImageUrls(start: number, end: number) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = start; i < end; i++) {
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
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  doInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      /*if (data.length === 1000) {
        event.target.disabled = true;
      }*/
    }, 500);
  }
}
