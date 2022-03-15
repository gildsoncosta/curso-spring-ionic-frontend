/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public route: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      //console.log('mostrando email em ionViewDidEnter: ', localUser.email);
      //this.email = JSON.stringify(localUser.email);
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //console.log(response);
          this.items = response['enderecos'];
        },
        error => {
            this.route.navigateByUrl('folder/Inbox');
        });
    }
    else {
      this.route.navigateByUrl('homePage');
    }
  }

}
