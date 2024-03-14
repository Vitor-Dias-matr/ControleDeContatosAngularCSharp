import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../../../../Models/Usuario';
import { Contato } from '../../../../Models/Contato';

import { UsuarioServiceService } from '../../../../Services/Usuario/usuario-service.service';
import { ContatoServiceService } from '../../../../Services/Contato/contato-service.service';
import { AlertService } from '../../../../Services/Alert/alert.service';

@Component({
  selector: 'app-new-contato',
  templateUrl: './new-contato.component.html',
  styleUrls: ['./new-contato.component.css']
})
export class NewContatoComponent {
  usuarios!: Usuario[];
  contatoForm!: FormGroup;
  contato!: Contato;
  constructor(
    private usuarioService: UsuarioServiceService,
    private contatoService: ContatoServiceService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.usuarioService.BuscarTodos().subscribe(response => {
      this.usuarios = response.data;
    });

    this.contatoForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      usuarioId: new FormControl('', [Validators.required])
    });
  }

  get nome() {
    return this.contatoForm.get('nome')!;
  }
  get email() {
    return this.contatoForm.get('email')!;
  }
  get celular() {
    return this.contatoForm.get('celular')!;
  }
  get usuarioId() {
    return this.contatoForm.get('usuarioId')!;
  }

  submit() {
    if (this.contatoForm.invalid) {
      return;
    }

    this.adicionar(this.contatoForm.value);
  }

  async adicionar(contato: Contato) {
    if (typeof contato.usuarioId === 'string') {
      contato.usuarioId = parseInt(contato.usuarioId);
    }

    await this.contatoService.Adicionar(contato).subscribe(response => {
      this.router.navigate(['/contato']);
      if (response.data) {
        this.alertService.addSucesso(`${contato.nome} adicionado com sucesso!`);
      }
      else {
        this.alertService.addErro(`Não foi possível adicionar ${contato.nome}!`);
      }
    });
  }
}
