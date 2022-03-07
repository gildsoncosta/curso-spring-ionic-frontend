import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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

  items: CategoriaDTO[];

  constructor(public menuCtrl: MenuController, public categoriaService: CategoriaService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();

    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
