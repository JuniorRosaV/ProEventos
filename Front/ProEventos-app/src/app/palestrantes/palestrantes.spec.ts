import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Palestrantes } from './palestrantes';

describe('Palestrantes', () => {
  let component: Palestrantes;
  let fixture: ComponentFixture<Palestrantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Palestrantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Palestrantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
