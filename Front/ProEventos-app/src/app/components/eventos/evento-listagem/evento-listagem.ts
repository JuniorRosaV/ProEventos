import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../../../models/Evento';
import { filter, Subscription } from 'rxjs';
import { EventoService } from '../../../services/evento-service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HoursFormatPipe } from '../../../helpers/hours-format-pipe';
import { DateTimeFormatPipe } from '../../../helpers/date-time-format-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evento-listagem',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DateTimeFormatPipe, HoursFormatPipe, RouterModule],
  standalone: true,
  templateUrl: './evento-listagem.html',
  styleUrls: ['./evento-listagem.scss']
})
export class EventoListagem implements OnInit{
  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  larguraImagem = 100;
  margemImagem = 2;
  mostrarImagem = true;
  private filtroListado = '';
  private routerSub?: Subscription;

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
    private router: Router,
    private cdr: ChangeDetectorRef
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
    console.log('Buscando eventos...');

    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        console.log('Eventos recebidos:', eventos);
        this.eventos = eventos ?? [];
        this.eventos = (eventos ?? []).map(e => ({ ...e, lotes: e.lotes ?? [] }));
        this.eventosFiltrados = this.eventos;
        this.loading = false;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar eventos:', error);
        this.eventos = [];
        this.eventosFiltrados = [];
        this.loading = false;
        this.spinner.hide();
        this.cdr.detectChanges();
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
