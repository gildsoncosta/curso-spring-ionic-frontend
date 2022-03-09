import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/domain/auth.service';
import { StorageService } from 'src/services/domain/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CategoriaService,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
