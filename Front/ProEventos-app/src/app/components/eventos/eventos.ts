import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Evento } from '../../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateTimeFormatPipe } from '../../helpers/date-time-format-pipe';
import { HoursFormatPipe } from '../../helpers/hours-format-pipe';
import { EventoService } from '../../services/evento-service';
import { Titulo } from '../../shared/titulo/titulo';

@Component({
  selector: 'app-eventos',
  standalone: true,              
  imports: [CommonModule,FormsModule, ReactiveFormsModule,DateTimeFormatPipe, HoursFormatPipe, Titulo],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  
  public ngOnInit(): void{
    this.spinner.show();
    this.getEventos();

    setTimeout(() => {

      this.spinner.hide();
    }, 5000);
  }


  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
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
    this.toastrService.success('Evento deletado com sucesso!', 'Deletado!');
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
