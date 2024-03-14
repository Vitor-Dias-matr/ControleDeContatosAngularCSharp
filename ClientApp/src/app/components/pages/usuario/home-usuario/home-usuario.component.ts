import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { UsuarioServiceService } from 'src/app/Services/Usuario/usuario-service.service';

import { Usuario } from 'src/app/Models/Usuario';
import { AlertService } from '../../../../Services/Alert/alert.service';
import { Contato } from '../../../../Models/Contato';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  menssagemModal = '';
  idApagar!: number;
  nomeApagar!: string;
  contatos!: Contato[] | undefined;

  constructor(
    private usuarioService: UsuarioServiceService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.atualizarListaUsuarios();
  }

  private atualizarListaUsuarios() {
    this.usuarioService.BuscarTodos().subscribe(response => {
      this.usuarios = response.data;
    });
  }

  apagar(nContatos: Contato[] | undefined, id: number, nome: string) {
    this.menssagemModal = `Você realmente deseja apagar ${nome}?`;
    this.idApagar = id;
    this.nomeApagar = nome;
    this.contatos = nContatos;
  }

  confirmarApagar() {
    if (this.contatos && this.contatos.length > 0) {
      this.alertService.addErro(`Não foi possível apagar ${this.nomeApagar}! Pois ${this.nomeApagar}, possui ${this.contatos.length} contato(s) vinculado(s) a ele!`);
    }
    else {
      this.usuarioService.Apagar(this.idApagar).subscribe(response => {
        if (response.data) {
          this.atualizarListaUsuarios();
          this.alertService.addSucesso(`${this.nomeApagar} apagado com sucesso!`);
        }
        else {
          this.alertService.addErro(`Não foi possível apagar ${this.nomeApagar}!`);
        }
      });
    }
  }

  @ViewChild('modalElement') modalElement!: ElementRef;
  fecharModal() {
    const modal = this.modalElement.nativeElement;
    modal.classList.add('hide');
  }
}
