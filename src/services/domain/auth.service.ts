import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { LocalUser } from 'src/models/Local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from './cart.service';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public cartService: CartService) { }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        console.log('entrei no refresh_Token');
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        // eslint-disable-next-line prefer-const
        let tok = authorizationValue.substring(7);

        // eslint-disable-next-line prefer-const
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub,
        };
        this.storage.setLocalUser(user);
        //console.log(user.email);
        this.cartService.createOrClearCart();
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}
