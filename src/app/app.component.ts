import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomePage } from './pages/home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages: Array<{ title: string; component: string }>;

  constructor(private route: Router) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: 'homePage' },
      { title: 'Categorias', component: 'categorias' }
    ];
  }

  openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.route.navigateByUrl(page.component);
    this.route.navigateByUrl(page.component);
    console.log('chamando a página', page);
  }
}
