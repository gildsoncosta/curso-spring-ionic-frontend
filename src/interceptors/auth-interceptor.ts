import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent,HttpHandler,HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/services/domain/storage.service';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public toastController: ToastController, public storage: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const localUser = this.storage.getLocalUser();
      const N = API_CONFIG.baseUrl.length;
      // eslint-disable-next-line eqeqeq
      const requestToApi = req.url.substring(0,N) == API_CONFIG.baseUrl;

      if (localUser && requestToApi) {
        const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
        return next.handle(authReq);
      }
      else {
          return next.handle(req);
      }
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
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
