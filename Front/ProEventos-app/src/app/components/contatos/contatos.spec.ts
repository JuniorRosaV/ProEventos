import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contatos } from './contatos';

describe('Contatos', () => {
  let component: Contatos;
  let fixture: ComponentFixture<Contatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
