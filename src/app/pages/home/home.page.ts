import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string;
  senha: string;

  constructor(public toastController: ToastController, private route: Router, public menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();
  }

  /** Próximos dois métodos serve p abrir esta pagina desabilitando/ Habilitando o menu, tirei pq aqui eu quero manter */
  /*ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }*/

  login() {
    if (this.email === 'admin@admin.com' && this.senha === 'admin') {
      this.route.navigateByUrl('/tabs/tab1');
      this.presentToast('Seja bem vindo', 'success');
    } else {
      //this.presentToast('Erro, usuário ou senha inválidos', 'danger');
      console.log('chamando a página', 'CategoriasPage');
      this.route.navigateByUrl('categorias');
    }
  }

  async presentToast(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      color: cor,
      duration: 2000
    });
    toast.present();
  }
}