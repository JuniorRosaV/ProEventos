import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  standalone: true,              
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss']  
})
export class Eventos {
  public eventos : any = [] ;
  public eventosFiltrados : any = [] ;
  larguraImagem: number = 100;
  margemImagem: number = 2;
  mostrarImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string 
  {
    return this._filtroLista;
  }

  public set filtroLista(value: string)
  {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  
  filtrarEventos(filtrarPor: string): any
  {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      ((evento:any)=> evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1))
  }

  constructor(private http: HttpClient){}
  
  ngOnInit(): void{
    this.getEventos();
  }


  public getEventos(): void {
    this.http.get('http://localhost:5074/api/evento').subscribe(
      (response: any) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }

  alternarImagem() 
  {
  this.mostrarImagem = !this.mostrarImagem;
  }

}
