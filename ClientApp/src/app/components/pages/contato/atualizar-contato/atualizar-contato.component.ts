import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../../../../Models/Usuario';
import { Contato } from '../../../../Models/Contato';

import { UsuarioServiceService } from '../../../../Services/Usuario/usuario-service.service';
import { ContatoServiceService } from '../../../../Services/Contato/contato-service.service';
import { AlertService } from '../../../../Services/Alert/alert.service';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-atualizar-contato',
  templateUrl: './atualizar-contato.component.html',
  styleUrls: ['./atualizar-contato.component.css']
})
export class AtualizarContatoComponent implements OnInit {
  usuarios!: Usuario[];
  atualizarContatoForm!: FormGroup;
  contato!: Contato;

  constructor(
    private usuarioService: UsuarioServiceService,
    private contatoService: ContatoServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.usuarioService.BuscarTodos().pipe(
      catchError((error) => {
        this.router.navigate(['/contato']);
        this.alertService.addErro('Ocorreu um erro ao buscar os usuários para vincular ao contato! Por favor, tente novamente!');
        return throwError('Erro: ', error);
      })
    ).subscribe(response => {
      this.usuarios = response.data;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.atualizarContatoForm = new FormGroup({
      id: new FormControl(id),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      usuarioId: new FormControl('', [Validators.required])
    });

    this.contatoService.BuscarPorId(id).pipe(
      catchError((error) => {
        this.router.navigate(['/contato']);
        this.alertService.addErro('Ocorreu um erro ao buscar o contato! Por favor, tente novamente!');
        return throwError('Erro: ', error);
      })
    ).subscribe((response) => {
      this.contato = response.data;

      this.atualizarContatoForm.patchValue({
        nome: this.contato.nome,
        email: this.contato.email,
        celular: this.contato.celular,
        usuarioId: this.contato.usuarioId
      });
    });
  }

  get nome() {
    return this.atualizarContatoForm.get('nome')!;
  }
  get email() {
    return this.atualizarContatoForm.get('email')!;
  }
  get celular() {
    return this.atualizarContatoForm.get('celular')!;
  }
  get usuarioId() {
    return this.atualizarContatoForm.get('usuarioId')!;
  }

  submit() {
    if (this.atualizarContatoForm.invalid) {
      return;
    }

    this.atualizar(this.atualizarContatoForm.value);
  }

  async atualizar(contato: Contato) {
    if (typeof contato.usuarioId === 'string') {
      contato.usuarioId = parseInt(contato.usuarioId);
    }

    this.contatoService.Atualizar(contato).subscribe(response => {
      this.router.navigate(['/contato']);
      if (response.data) {
        this.alertService.addSucesso(`${contato.nome} atualizado com sucesso!`);
      }
      else {
        this.alertService.addErro(`Não foi possível atualizar ${contato.nome}!`);
      }
    });
  }
}
