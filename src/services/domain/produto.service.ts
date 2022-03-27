/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient, private router: Router) {

    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    findByCategoria(nome: string, categoriaId: string, page: number = 0, linesPerPage: number = 24) {
        //console.log('findByCategoria(categoriaId: string)', categoriaId);
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?nome=${nome}&categorias=${categoriaId}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        const url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    getImageFromBucket(id: string): Observable<any> {
        const url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }
}
