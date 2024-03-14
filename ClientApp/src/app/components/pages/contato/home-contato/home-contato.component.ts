import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { UsuarioServiceService } from '../../../../Services/Usuario/usuario-service.service';
import { ContatoServiceService } from 'src/app/Services/Contato/contato-service.service';

import { Usuario } from '../../../../Models/Usuario';
import { Contato } from 'src/app/Models/Contato';
import { AlertService } from '../../../../Services/Alert/alert.service';

@Component({
  selector: 'app-home-contato',
  templateUrl: './home-contato.component.html',
  styleUrls: ['./home-contato.component.css']
})
export class HomeContatoComponent implements OnInit {
  usuarios: Usuario[] = [];
  contatos: Contato[] = [];
  menssagemModal = '';
  idApagar!: number;
  nomeApagar!: string;

  constructor(
    private usuarioService: UsuarioServiceService,
    private contatoService: ContatoServiceService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.atualizarListaContatos();
  }

  private atualizarListaContatos() {
    this.contatoService.BuscarTodos().subscribe(response => {
      this.contatos = response.data;

      for (let contato of this.contatos) {
        this.usuarioService.BuscarPorId(contato.usuarioId).subscribe(response => {
          contato.usuario = response.data;
        });
      }
    });
  }

  apagar(id: number, nome: string) {
    this.menssagemModal = `Você realmente deseja apagar ${nome}?`;
    this.idApagar = id;
    this.nomeApagar = nome;
  }

  confirmarApagar() {
    this.contatoService.Apagar(this.idApagar).subscribe(response => {
      if (response.data) {
        this.atualizarListaContatos();
        this.alertService.addSucesso(`${this.nomeApagar} apagado com sucesso!`);
        this.fecharModal();
      }
      else {
        this.alertService.addErro(`Não foi possível apagar ${this.nomeApagar}!`);
        this.fecharModal();
      }
    });
  }

  @ViewChild('modalElement') modalElement!: ElementRef;
  fecharModal() {
    const modal = this.modalElement.nativeElement;
    modal.classList.add('hide');
  }
}
