import { Component, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ]),
    trigger('slideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ])
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ])
    ])
  ]
})
export class Perfil {

  tituloOpen = false;
  funcaoOpen = false;

  tituloSelecionado = '';
  funcaoSelecionada = 'Participante';

  toggleTitulo(event: Event) {
    event.stopPropagation();
    this.tituloOpen = !this.tituloOpen;
    this.funcaoOpen = false;
  }

  toggleFuncao(event: Event) {
    event.stopPropagation();
    this.funcaoOpen = !this.funcaoOpen;
    this.tituloOpen = false;
  }

  selectTitulo(valor: string) {
    this.tituloSelecionado = valor;
    this.tituloOpen = false;
  }

  selectFuncao(valor: string) {
    this.funcaoSelecionada = valor;
    this.funcaoOpen = false;
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.tituloOpen = false;
    this.funcaoOpen = false;
  }
}
