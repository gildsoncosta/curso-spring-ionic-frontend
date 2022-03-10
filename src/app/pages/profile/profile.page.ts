import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, NavParams } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public menuCtrl: MenuController,
    public clienteService: ClienteService,
    private route: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.close();

    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      //console.log('mostrando email em profile:-> ', localUser.email);
      //this.email = JSON.stringify(localUser.email);
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();

          console.log(response, 'cadê email: '+localUser.email);
        },
        error => {
            console.log('erro ao entrar em profile status', error.status);
            this.route.navigateByUrl('folder/Inbox');
        });
    }
    else {
      console.log('erro ao entrar em profile localUser', localUser);
      this.route.navigateByUrl('folder/Inbox');
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }
}
