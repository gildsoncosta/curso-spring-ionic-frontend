/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { API_CONFIG } from 'src/config/api.config';
import { ClienteDTO } from 'src/models/cliente.dto';
import { StorageService } from './storage.service';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }
    findByEmail(email: string): Observable<ClienteDTO> {
        // eslint-disable-next-line prefer-const
        //let token = this.storage.getLocalUser().token;
        //const authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
        // eslint-disable-next-line quote-props
        //{'headers': authHeader});
    }

    getImageFromBucket(id: string): Observable<any> {
        const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, { responseType: 'blob' });
    }

    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
