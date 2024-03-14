import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../../Models/Usuario';
import { UsuarioServiceService } from '../../../../../Services/Usuario/usuario-service.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../../Services/Alert/alert.service';

@Component({
  selector: 'app-identificacao-usuario',
  templateUrl: './identificacao-usuario.component.html',
  styleUrls: ['./identificacao-usuario.component.css']
})
export class IdentificacaoUsuarioComponent {
  identificarUsuarioForm!: FormGroup;
  usuario!: Usuario;

  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.identificarUsuarioForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get login() {
    return this.identificarUsuarioForm.get('login')!;
  }
  get email() {
    return this.identificarUsuarioForm.get('email')!;
  }

  submit() {
    if (this.identificarUsuarioForm.invalid) {
      return;
    }

    this.buscarPorEmailELogin(this.email.value, this.login.value);
  }

  async buscarPorEmailELogin(email: string, login: string) {
    await this.usuarioService.BuscarPorEmailELogin(email, login).subscribe(response => {
      if (response.data) {
        this.usuario = response.data;

        this.router.navigate([`/alterarSenha/${this.usuario.id}`]);
      }
      else {
        this.router.navigate([`/`]);
        this.alertService.addErro(`Não foi possível alterar a senha! Login e/ou email inválidos!`);
      }
    });
  }
}
