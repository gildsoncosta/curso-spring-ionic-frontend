import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CartItem } from 'src/models/cart-items';
import { AuthService } from 'src/services/domain/auth.service';
import { CartService } from 'src/services/domain/cart.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  items: CartItem[];

  constructor(private activatedRoute: ActivatedRoute,
    public auth: AuthService,
    public cartService: CartService,
    public storage: StorageService,
    public menuCtrl: MenuController,
    private route: Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.menuCtrl.close();
    const cart = this.cartService.tempoLimiteItemPedido();
    this.items = cart.items;
  }


  ionViewDidEnter() {
    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
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


}
