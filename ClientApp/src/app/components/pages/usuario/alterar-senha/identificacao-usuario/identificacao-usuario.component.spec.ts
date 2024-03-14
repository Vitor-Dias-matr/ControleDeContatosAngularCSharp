import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacaoUsuarioComponent } from './identificacao-usuario.component';

describe('IdentificacaoUsuarioComponent', () => {
  let component: IdentificacaoUsuarioComponent;
  let fixture: ComponentFixture<IdentificacaoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacaoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentificacaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
