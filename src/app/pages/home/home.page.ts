import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string;
  senha: string;

  constructor(public toastController: ToastController, private route: Router) { }

  ngOnInit() {
  }

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
