import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventoService } from '../services/evento-service';
import { Evento } from '../models/Evento';
import { DateTimeFormatPipe } from '../helpers/date-time-format-pipe';
import { HoursFormatPipe } from '../helpers/hours-format-pipe';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  standalone: true,              
  imports: [CommonModule,FormsModule, ReactiveFormsModule,DateTimeFormatPipe, HoursFormatPipe],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss']  
})
export class Eventos {
  modalRef?: BsModalRef;
  public eventos : Evento[] = [] ;
  public eventosFiltrados : Evento[] = [] ;
  larguraImagem = 100;
  margemImagem = 2;
  mostrarImagem = true;
  private filtroListado = '';

  public get filtroLista(): string 
  {
    return this.filtroListado;
  }

  public set filtroLista(value: string)
  {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  
  public filtrarEventos(filtrarPor: string): Evento[]
  {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      ((evento:Evento)=> evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1))
  }

  constructor
  (
    private eventoService: EventoService,
    private modalService: BsModalService
  ) {}
  
  public ngOnInit(): void{
    this.getEventos();
  }


  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  public alterarImagem() :  void
  {
  this.mostrarImagem = !this.mostrarImagem;
  }
  
  openModal(template: TemplateRef<void>) :void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
