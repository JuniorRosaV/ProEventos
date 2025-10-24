import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Titulo } from '../../shared/titulo/titulo';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,              
  imports: [RouterModule,Titulo],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Eventos implements OnInit {
  ngOnInit(): void {
  }
}
