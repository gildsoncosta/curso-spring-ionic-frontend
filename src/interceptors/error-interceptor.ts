import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent,HttpHandler,HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { error } from 'protractor';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public toastController: ToastController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('passou no intercept');
      return next.handle(req).pipe(
        map(retorno => retorno),
        catchError(erro => this.exiberErroIntercept(erro))
      );
    }

    async exiberErroIntercept(erro) {
      let errorObj = erro;
      if (errorObj.error){
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      const toast = await this.toastController.create({
        message: errorObj.message,
        duration: 2000,
        color: 'danger',
        position: 'middle'
      });
      toast.present();
      return null;
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
