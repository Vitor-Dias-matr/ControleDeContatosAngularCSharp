import { Component, OnInit } from '@angular/core';
import { AlterarSenha } from '../../../../Models/AlterarSenha';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioServiceService } from '../../../../Services/Usuario/usuario-service.service';
import { AlertService } from '../../../../Services/Alert/alert.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  alterarSenhaForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.alterarSenhaForm = new FormGroup({
      id: new FormControl(id),
      senhaAtual: new FormControl('', [Validators.required]),
      novaSenha: new FormControl('', [Validators.required]),
      confirmarNovaSenha: new FormControl('', [Validators.required]),
    });
  }

  get senhaAtual() {
    return this.alterarSenhaForm.get('senhaAtual')!;
  }
  get novaSenha() {
    return this.alterarSenhaForm.get('novaSenha')!;
  }
  get confirmarNovaSenha() {
    return this.alterarSenhaForm.get('confirmarNovaSenha')!;
  }

  submit() {
    if (this.alterarSenhaForm.invalid) {
      return;
    }

    this.alterarSenha(this.alterarSenhaForm.value);
  }

  async alterarSenha(alterarSenha: AlterarSenha) {
    await this.usuarioService.AlterarSenha(alterarSenha).subscribe(response => {
        this.router.navigate([`/`]);
      if (response.data) {
        this.alertService.addSucesso(`Senha alterada com sucesso!`);
      }
      else {
        this.alertService.addErro(`Não foi possível alterar a senha!`);
      }
    });
  }
}
