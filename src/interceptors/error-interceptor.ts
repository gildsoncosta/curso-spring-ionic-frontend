import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent,HttpHandler,HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/services/domain/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public toastController: ToastController, public storage: StorageService, private route: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('passou no intercept');
      return next.handle(req).pipe(
        map(retorno => retorno),
        catchError(erro => this.exiberErroIntercept(erro))
      );
    }

    async exiberErroIntercept(erro) {

      let errorObj = erro;

      switch(errorObj.status) {
        case 403:
          this.handle403();
          break;
      }

      console.log('exibir error-interceptor ', errorObj.status, errorObj.message);

      if (errorObj.error){
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      this.apresentarToast();

      this.route.navigateByUrl('folder/Inbox');

      return null;
    }

    handle403() {
      this.storage.setLocalUser(null);
    }

    async apresentarToast() {
      const toast = await this.toastController.create({
        message: 'Erro ao acessar página',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
