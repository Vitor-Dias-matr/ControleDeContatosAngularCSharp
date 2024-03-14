import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../../../../Models/Usuario';
import { UsuarioSemSenha } from '../../../../Models/UsuarioSemSenha';

import { UsuarioServiceService } from '../../../../Services/Usuario/usuario-service.service';
import { AlertService } from '../../../../Services/Alert/alert.service';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['./atualizar-usuario.component.css']
})
export class AtualizarUsuarioComponent {
  usuario!: Usuario;
  atualizarUsuarioForm!: FormGroup;
  constructor(
    private usuarioService: UsuarioServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.atualizarUsuarioForm = new FormGroup({
      id: new FormControl(id),
      nome: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      perfil: new FormControl('', [Validators.required])
    });

    this.usuarioService.BuscarPorId(id).subscribe((response) => {
      this.usuario = response.data;

      this.atualizarUsuarioForm.patchValue({
        nome: this.usuario.nome,
        login: this.usuario.login,
        email: this.usuario.email,
        perfil: this.usuario.perfil
      });
    });
  }

  get nome() {
    return this.atualizarUsuarioForm.get('nome')!;
  }
  get login() {
    return this.atualizarUsuarioForm.get('login')!;
  }
  get email() {
    return this.atualizarUsuarioForm.get('email')!;
  }
  get perfil() {
    return this.atualizarUsuarioForm.get('perfil')!;
  }
  get senha() {
    return this.atualizarUsuarioForm.get('senha')!;
  }

  submit() {
    if (this.atualizarUsuarioForm.invalid) {
      return;
    }

    this.atualizar(this.atualizarUsuarioForm.value);
  }

  async atualizar(usuario: UsuarioSemSenha) {
    if (typeof usuario.perfil === 'string') {
      usuario.perfil = parseInt(usuario.perfil);
    }

    await this.usuarioService.Atualizar(usuario).subscribe(response => {
      this.router.navigate(['/usuario']);
      if (response.data) {
        this.alertService.addSucesso(`${usuario.nome} atualizado com sucesso!`);
      }
      else {
        this.alertService.addErro(`Não foi possível atualizar ${usuario.nome}!`);
      }
    });
  }
}
