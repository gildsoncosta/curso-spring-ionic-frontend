/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  bucketUrlCat: string = API_CONFIG.bucketBaseUrl + '/cat';


  items: CategoriaDTO[] = [];
  page: number = 0;
  busca: string = "";

  constructor(
    public menuCtrl: MenuController,
    public categoriaService: CategoriaService,
    public toastController: ToastController,
    public alertController: AlertController,
    private route: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  buscarCategorias(evento) {
    let loader = this.presentLoading();
    if (evento) {
      if (evento.target) {
        this.busca = evento.target.value;
        this.items = [];
      this.page = 0;
      } else {
        this.busca = evento;
      }
    }

    this.categoriaService.findPage(this.busca, this.page, 10)
      .subscribe(response => {
        let start = this.items ? this.items.length : 1;
        this.items = this.items ? this.items.concat(response['content']) : response['content'];
        let end = this.items.length - 1;
        console.log(this.page);
        console.log(this.items);
        console.log(response);
      },
        error => { this.route.navigateByUrl('categorias'); });
    loader.finally();
  }

  loadData() {
    this.menuCtrl.close();
    this.buscarCategorias(this.busca);
    /*this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
        console.log(response);
      },
        error => { });*/
  }

  showProdutos(categoriaId: string) {
    this.route.navigate(['produtos', { categoria_id: categoriaId }]);
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

  async presentLoading() {
    const loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde ...',
      duration: 1000
    });
    await loader.present();
    const { role, data } = await loader.onDidDismiss();
    //console.log('Loading dismissed!');
    return loader;
  }

}
