import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();
  }

}
