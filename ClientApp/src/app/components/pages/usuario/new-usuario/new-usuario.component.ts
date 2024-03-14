import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../../../../Models/Usuario';

import { UsuarioServiceService } from '../../../../Services/Usuario/usuario-service.service';
import { AlertService } from '../../../../Services/Alert/alert.service';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css']
})
export class NewUsuarioComponent {
  usuarioForm!: FormGroup;
  usuario!: Usuario;
  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      perfil: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  get nome() {
    return this.usuarioForm.get('nome')!;
  }
  get login() {
    return this.usuarioForm.get('login')!;
  }
  get email() {
    return this.usuarioForm.get('email')!;
  }
  get perfil() {
    return this.usuarioForm.get('perfil')!;
  }
  get senha() {
    return this.usuarioForm.get('senha')!;
  }

  submit() {
    if (this.usuarioForm.invalid) {
      return;
    }

    this.adicionar(this.usuarioForm.value);
  }

  async adicionar(usuario: Usuario) {
    if (typeof usuario.perfil === 'string') {
      usuario.perfil = parseInt(usuario.perfil);
    }

    await this.usuarioService.Adicionar(usuario).subscribe(response => {
        this.router.navigate(['/usuario']);
      if (response.data) {
        this.alertService.addSucesso(`${usuario.nome} adicionado com sucesso!`);
      }
      else {
        this.alertService.addErro(`Não foi possível adicionar ${usuario.nome}!`);
      }
    });
  }
}
