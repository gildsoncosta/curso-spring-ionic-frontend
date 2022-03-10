/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/domain/auth.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string;
  senha: string;

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(
     public toastController: ToastController,
     private route: Router,
     public menuCtrl: MenuController,
     public auth: AuthService,
     public storage: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();
  }

  ionViewDidEnter(){
    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) { {}
      this.auth.refreshToken()
        .subscribe(response => {
          this.auth.successfulLogin(response.headers.get('Authorization'));
          this.route.navigateByUrl('categorias');
        },
        error => {
          if (error.status === 403) {
            this.route.navigateByUrl('folder/Inbox');
          }
        });
      }
  }

  /** Próximos dois métodos serve p abrir esta pagina desabilitando/ Habilitando o menu, tirei pq aqui eu quero manter */
  /*ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }*/

  login() {
    console.log(this.creds);

    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.route.navigateByUrl('categorias');
      },
      error => {
        if (error.status === 403) {
          this.route.navigateByUrl('folder/Inbox');
        }
      });
    }

    /*if (this.email === 'admin@admin.com' && this.senha === 'admin') {
      this.route.navigateByUrl('/tabs/tab1');
      this.presentToast('Seja bem vindo', 'success');
    } else {
      //this.presentToast('Erro, usuário ou senha inválidos', 'danger');
      console.log('chamando a página', 'CategoriasPage');
      this.route.navigateByUrl('categorias');
    }*/

  async presentToast(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      color: cor,
      duration: 2000
    });
    toast.present();
  }
}
