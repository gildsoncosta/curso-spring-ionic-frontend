import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { CidadeDTO } from 'src/models/cidade.dto';

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    findAll(estado_id: string): Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}
