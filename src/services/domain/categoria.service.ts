/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {

    }

    findAll(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

    findPage(nome: string, page: number = 0, linesPerPage: number = 24) {
        //console.log('findByCategoria(categoriaId: string)', categoriaId);
        return this.http.get(`${API_CONFIG.baseUrl}/categorias/page/?nome=${nome}&page=${page}&linesPerPage=${linesPerPage}`);
        /*if (nome.trim() !== '') {
            console.log("busca com evento: ", nome);
            return this.http.get(`${API_CONFIG.baseUrl}/categorias/page/?nome=${nome}&page=${page}&linesPerPage=${linesPerPage}`);
        } else {
            console.log("busca vazia: ", nome);
            return this.http.get(`${API_CONFIG.baseUrl}/categorias/page/?page=${page}&linesPerPage=${linesPerPage}`);
        }*/
    }

}
