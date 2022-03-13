/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/services/domain/storage.service';
import { Router } from '@angular/router';
import { FieldMessage } from 'src/models/fieldMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public toastController: ToastController,
    public storage: StorageService,
    private route: Router,
    public alertCtrl: AlertController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(retorno => retorno),
      catchError(erro => this.exiberErroIntercept(erro))
    );
  }

  async exiberErroIntercept(erro) {

    let errorObj = erro;

    switch (errorObj.status) {
      case 401:
        this.handle401();
        break;
      case 403:
        this.handle403();
        break;
      case 422:
        if (errorObj) {
          this.handle422(errorObj);
        }
        break;
      default:
        this.handleDefaultError(errorObj);
    }

    //console.log('exibir error-interceptor ', errorObj);

    if (errorObj.error) {
      errorObj = errorObj.error;
    }
    if (!errorObj.status) {
      errorObj = JSON.parse(errorObj);
    }

    //this.route.navigateByUrl('folder/Inbox');

    return null;
  }

  handle401() {
    this.storage.setLocalUser(null);
    this.apresentarToast('Erro de autentificação ');
  }

  handle403() {
    this.storage.setLocalUser(null);
    this.apresentarToast('Erro ao acessar página ');
  }

  async handle422(errorObj) {
    const objeto = JSON.parse(errorObj.error);
    //console.log('Imprimindo objeto com parse: ', objeto.erros[0]);

    let alert = await this.alertCtrl.create({
      header: 'Erro 422: Validação',
      message: this.listErrors(objeto.erros ? objeto.erros : ''),
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    await alert.present();
  }

  handleDefaultError(errorObj) {
    this.apresentarToast('Erro default:  ' + errorObj.status + ': ' + errorObj.erro + ': ' + errorObj.message);
  }

  async apresentarToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'success',
      position: 'middle'
    });
    toast.present();
  }

  private listErrors(messages: FieldMessage[]): string {
    //console.log(messages);
    let s = '';
    if (messages) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (var i = 0; i < messages.length; i++) {
        s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
      }
    }
    return s;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
