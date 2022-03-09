import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { LocalUser } from 'src/models/Local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
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
            token: tok
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}
