import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContatoComponent } from './new-contato.component';

describe('NewContatoComponent', () => {
  let component: NewContatoComponent;
  let fixture: ComponentFixture<NewContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
