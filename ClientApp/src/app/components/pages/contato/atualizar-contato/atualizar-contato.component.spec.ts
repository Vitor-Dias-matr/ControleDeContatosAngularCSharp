import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarContatoComponent } from './atualizar-contato.component';

describe('AtualizarContatoComponent', () => {
  let component: AtualizarContatoComponent;
  let fixture: ComponentFixture<AtualizarContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarContatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
