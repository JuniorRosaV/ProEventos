import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoCarregar } from './evento-carregar';

describe('EventoCarregar', () => {
  let component: EventoCarregar;
  let fixture: ComponentFixture<EventoCarregar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoCarregar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoCarregar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
