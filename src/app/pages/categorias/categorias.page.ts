import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(public menuCtrl: MenuController, public categoriaService: CategoriaService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();

    this.categoriaService.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
