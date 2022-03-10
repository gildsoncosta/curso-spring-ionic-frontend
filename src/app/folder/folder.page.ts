import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/domain/auth.service';
import { StorageService } from 'src/services/domain/storage.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,
     public auth: AuthService,
     public storage: StorageService,
     public menuCtrl: MenuController,
     private route: Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.menuCtrl.close();
  }


  ionViewDidEnter() {
    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      { }
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
