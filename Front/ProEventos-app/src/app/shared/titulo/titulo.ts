import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  standalone: true,
  templateUrl: './titulo.html',
  styleUrls: ['./titulo.scss']
})
export class Titulo implements OnInit {
  @Input() titulo: string = '';
  @Input() subtitulo: string = 'Desde 2025';
  @Input() iconClass: string = 'fa fa-user';

  ngOnInit(): void {
    this.listar();
  }

  constructor(private router: Router) {}

  listar(): void {
  const rota = this.titulo.toLocaleLowerCase();
    if (rota === 'dashboard') {
      this.router.navigate(['/dashboards']);
    } else {
      this.router.navigate([`/${rota}/lista`]);
    }
  }
}
