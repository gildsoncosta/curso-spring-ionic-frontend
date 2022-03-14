import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';
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

  constructor(private route: Router, public produtoService: ProdutoService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.produto_id = this.produtoService.getProduto_id();
    console.log('this.produtoService.getProduto_id()', this.produto_id);
    this.produtoService.findById(this.produto_id)
      .subscribe(response => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
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
}
