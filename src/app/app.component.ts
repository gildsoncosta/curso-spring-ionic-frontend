import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/domain/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages: Array<{ title: string; component: string }>;

  constructor(private route: Router, public auth: AuthService) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Principal', component: 'folder/Inbox' },
      { title: 'Profile', component: 'profile' },
      { title: 'Login', component: 'homePage' },
      { title: 'Categorias', component: 'categorias' },
      { title: 'Carrinho', component: 'cart'},
      { title: 'Logout', component: '' }
    ];
  }

  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  openPage(page: { title: string , component: string}) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.route.navigateByUrl(page.component);
    switch (page.title) {
      case 'Logout':
        this.auth.logout();
        this.route.navigateByUrl('folder/Inbox');
        break;

      default:
        this.route.navigateByUrl(page.component);
    }

    //console.log('chamando a página', page);
  }
}
