/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  bucketUrlCat: string = API_CONFIG.bucketBaseUrl+'/cat';


  items: CategoriaDTO[];

  constructor(public menuCtrl: MenuController,
     public categoriaService: CategoriaService,
     public toastController: ToastController,
     public alertController: AlertController,
     private route: Router,
     private produtoService: ProdutoService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();

    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
      console.log(response);
    },
    error => {});
  }

  showProdutos(categoriaId: string) {
    this.produtoService.setCategoria_id(categoriaId);
    console.log('categoriaId em categorias.page.ts', categoriaId);
    this.route.navigateByUrl('produtos');
    //const url = '/produtos?categoriaId='+categoriaId;
    //this.route.navigateByUrl(url);
    //this.route.navigate(['produtos'], { queryParams: { categorioaId: categoriaId } });
    //this.route.navigate(['/produtos'], { queryParams: { page: '1' } });
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta !',
      message: 'Deseja realmente favoritar o filme ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim favoritar',
          id: 'confirm-button',
          handler: () => {
            this.apresentarToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
