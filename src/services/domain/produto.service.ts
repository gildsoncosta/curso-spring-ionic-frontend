import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class ProdutoService {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private categoria_id: string;

    constructor(public http: HttpClient, private router: Router) {

    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    findByCategoria(categoriaId: string) {
        console.log('findByCategoria(categoriaId: string)', categoriaId);
        return this.http.get(`${API_CONFIG.baseUrl}/produtoshh/?categorias=${categoriaId}`);
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    setCategoria_id(categoria_id: string) {
        this.categoria_id = categoria_id;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    getCategoria_id() {
        return this.categoria_id;
    }
}
