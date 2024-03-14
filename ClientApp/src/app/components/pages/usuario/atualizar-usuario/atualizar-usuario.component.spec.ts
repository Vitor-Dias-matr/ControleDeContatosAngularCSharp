import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarUsuarioComponent } from './atualizar-usuario.component';

describe('AtualizarUsuarioComponent', () => {
  let component: AtualizarUsuarioComponent;
  let fixture: ComponentFixture<AtualizarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
