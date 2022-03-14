/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private produto_id: string;

  constructor(
    private route: Router,
    public produtoService: ProdutoService,
    private _router: ActivatedRoute,
    public cartService: CartService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //console.log('this._router.snapshot.paramMap: ',this._router.snapshot.paramMap);
    this.produto_id = this._router.snapshot.paramMap.get('produto_id');
    this.produtoService.findById(this.produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
        error => { this.route.navigateByUrl('produtos'); });
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
    .subscribe(respone => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    },
    error =>{});
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.route.navigateByUrl('cart');
  }
}
