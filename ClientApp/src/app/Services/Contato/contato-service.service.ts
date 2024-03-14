import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contato } from 'src/app/Models/Contato';
import { Response } from 'src/app/Models/Response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoServiceService {
  private baseController = `${environment.baseController}/Contato`;

  constructor(private http: HttpClient) { }

  BuscarTodos(): Observable<Response<Contato[]>> {
    const urlController = `${this.baseController}/BuscarTodos`;
    return this.http.get<Response<Contato[]>>(urlController);
  }

  BuscarTodosPorUsuario(idUsuario: number): Observable<Response<Contato[]>> {
    const urlController = `${this.baseController}/BuscarTodosPorUsuario/${idUsuario}`;
    return this.http.get<Response<Contato[]>>(urlController);
  }

  BuscarPorId(id: number): Observable<Response<Contato>> {
    const urlController = `${this.baseController}/BuscarPorId/${id}`;
    return this.http.get<Response<Contato>>(urlController);
  }

  Adicionar(contato: Contato): Observable<Response<boolean>> {
    return this.http.post<Response<boolean>>(this.baseController, contato);
  }

  Atualizar(contato: Contato): Observable<Response<boolean>> {
    return this.http.put<Response<boolean>>(this.baseController, contato);
  }

  Apagar(id: number): Observable<Response<boolean>> {
    const urlController = `${this.baseController}/Apagar/${id}`;
    return this.http.delete<Response<boolean>>(urlController);
  }
}
