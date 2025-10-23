import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  standalone: true,
  templateUrl: './titulo.html',
  styleUrls: ['./titulo.scss']
})
export class Titulo {
  @Input() titulo: string = '';
  @Input() subtitulo: string = 'Desde 2025';
  @Input() iconClass: string = 'fa fa-user';
}
