import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Titulo } from '../../shared/titulo/titulo';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [Titulo],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('slideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate('600ms 150ms ease-out')
      ])
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('600ms 300ms ease-out')
      ])
    ])
  ]
})
export class Perfil {}
