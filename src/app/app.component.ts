import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/domain/auth.service';
import { StorageService } from 'src/services/domain/storage.service';
import { HomePage } from './pages/home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages: Array<{ title: string; component: string }>;

  constructor(private route: Router, public auth: AuthService, public storage: StorageService) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'profile' },
      { title: 'Login', component: 'homePage' },
      { title: 'Categorias', component: 'categorias' }
    ];
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

  openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.route.navigateByUrl(page.component);
    this.route.navigateByUrl(page.component);
    console.log('chamando a página', page);
  }
}
