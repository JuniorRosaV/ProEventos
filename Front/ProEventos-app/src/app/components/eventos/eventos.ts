import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Evento } from '../../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateTimeFormatPipe } from '../../helpers/date-time-format-pipe';
import { HoursFormatPipe } from '../../helpers/hours-format-pipe';
import { EventoService } from '../../services/evento-service';
import { Titulo } from '../../shared/titulo/titulo';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-eventos',
  standalone: true,              
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DateTimeFormatPipe, HoursFormatPipe, Titulo],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Eventos implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  larguraImagem = 100;
  margemImagem = 2;
  mostrarImagem = true;
  private filtroListado = '';
  private routerSub?: Subscription;

  // Variável para controlar o estado de carregamento
  public loading: boolean = false;

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  
  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: Evento) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getEventos();

    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.getEventos();
      });
  }

  public ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  public getEventos(): void {
    this.loading = true;
    this.spinner.show();

    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos ?? [];
        this.eventos = (eventos ?? []).map(e => ({ ...e, lotes: e.lotes ?? [] }));
        this.eventosFiltrados = this.eventos;
        this.loading = false;    // Finaliza o loading
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.eventos = [];
        this.eventosFiltrados = [];
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  public alterarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }
  
  openModal(template: TemplateRef<void>): void {
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
