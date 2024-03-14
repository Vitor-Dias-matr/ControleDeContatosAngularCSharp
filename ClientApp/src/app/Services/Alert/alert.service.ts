import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  menssagemErro: string = '';
  menssagemSucesso: string = '';

  constructor() { }

  addErro(menssagem: string) {
    this.menssagemErro = menssagem;
  }

  addSucesso(menssagem: string) {
    this.menssagemSucesso = menssagem;
  }

  clear() {
    this.menssagemErro = '';
    this.menssagemSucesso = '';
  }
}
