import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  standalone: true,
  templateUrl: './titulo.html',
  styleUrls: ['./titulo.scss']
})
export class Titulo {
  @Input() titulo: string = '';
}
