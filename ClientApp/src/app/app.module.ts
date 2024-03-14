import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HomeUsuarioComponent } from './components/pages/usuario/home-usuario/home-usuario.component';
import { HomeContatoComponent } from './components/pages/contato/home-contato/home-contato.component';
import { NewUsuarioComponent } from './components/pages/usuario/new-usuario/new-usuario.component';
import { NewContatoComponent } from './components/pages/contato/new-contato/new-contato.component';
import { AtualizarUsuarioComponent } from './components/pages/usuario/atualizar-usuario/atualizar-usuario.component';
import { AtualizarContatoComponent } from './components/pages/contato/atualizar-contato/atualizar-contato.component';
import { IdentificacaoUsuarioComponent } from './components/pages/usuario/alterar-senha/identificacao-usuario/identificacao-usuario.component';
import { AlterarSenhaComponent } from './components/pages/usuario/alterar-senha/alterar-senha.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeUsuarioComponent,
    HomeContatoComponent,
    NewUsuarioComponent,
    NewContatoComponent,
    AtualizarUsuarioComponent,
    AtualizarContatoComponent,
    IdentificacaoUsuarioComponent,
    AlterarSenhaComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'usuario', component: HomeUsuarioComponent },
      { path: 'contato', component: HomeContatoComponent },
      { path: 'new-usuario', component: NewUsuarioComponent },
      { path: 'new-contato', component: NewContatoComponent },
      { path: 'atualizar-usuario/:id', component: AtualizarUsuarioComponent },
      { path: 'atualizar-contato/:id', component: AtualizarContatoComponent },
      { path: 'IdentificacaoUsuario', component: IdentificacaoUsuarioComponent },
      { path: 'alterarSenha/:id', component: AlterarSenhaComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
