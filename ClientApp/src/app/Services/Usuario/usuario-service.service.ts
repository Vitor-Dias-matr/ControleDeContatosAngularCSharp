import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioSemSenha } from 'src/app/Models/UsuarioSemSenha';
import { AlterarSenha } from 'src/app/Models/AlterarSenha';
import { Response } from 'src/app/Models/Response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private baseController = `${environment.baseController}/Usuario`;

  constructor(private http: HttpClient) { }

  BuscarTodos(): Observable<Response<Usuario[]>> {
    const urlController = `${this.baseController}/BuscarTodos`;
    return this.http.get<Response<Usuario[]>>(urlController);
  }

  BuscarPorId(id: number): Observable<Response<Usuario>> {
    const urlController = `${this.baseController}/BuscarPorId/${id}`;
    return this.http.get<Response<Usuario>>(urlController);
  }

  BuscarPorEmailELogin(email: string, login: string): Observable<Response<Usuario>> {
    const urlController = `${this.baseController}/BuscarPorEmailELogin/${email}&${login}`;
    return this.http.get<Response<Usuario>>(urlController);
  }

  Adicionar(usuario: Usuario): Observable<Response<boolean>> {
    return this.http.post<Response<boolean>>(this.baseController, usuario);
  }

  Atualizar(usuario: UsuarioSemSenha): Observable<Response<boolean>> {
    return this.http.put<Response<boolean>>(this.baseController, usuario);
  }

  Apagar(id: number): Observable<Response<boolean>> {
    const urlController = `${this.baseController}/Apagar/${id}`;
    return this.http.delete<Response<boolean>>(urlController);
  }

  AlterarSenha(alterarSenha: AlterarSenha): Observable<Response<boolean>> {
    const urlController = `${this.baseController}/AlterarSenhaUsuario`;
    return this.http.put<Response<boolean>>(urlController, alterarSenha);
  }
}
