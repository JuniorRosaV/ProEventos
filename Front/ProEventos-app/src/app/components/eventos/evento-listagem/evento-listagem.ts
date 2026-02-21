import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  TemplateRef,
  Inject,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../../../models/Evento';
import { EventoService } from '../../../services/evento-service';
import { DateTimeFormatPipe } from '../../../helpers/date-time-format-pipe';
import { HoursFormatPipe } from '../../../helpers/hours-format-pipe';

@Component({
  selector: 'app-evento-listagem',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DateTimeFormatPipe,
    HoursFormatPipe
  ],
  templateUrl: './evento-listagem.html',
  styleUrls: ['./evento-listagem.scss']
})
export class EventoListagem
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('network') canvas!: ElementRef<HTMLCanvasElement>;

  modalRef?: BsModalRef;

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];

  totalParticipantes = 0; // 🔥 agora não é mais getter

  eventoId = 0;
  loading = false;
  mostrarImagem = true;

  particles: Array<{ x: string; d: string; s: string }> = [];

  private animationFrameId?: number;
  private mouseMoveListener?: (e: MouseEvent) => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEventos();

    if (isPlatformBrowser(this.platformId)) {
      this.initParticles();
      this.initMouseGlow();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCanvasNetwork();
    }
  }

  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  irParaDetalhe(id: number) {
    this.router.navigate(['/eventos/carregar', id]);
  }

  private atualizarTotal(): void {
    this.totalParticipantes = this.eventos.reduce(
      (total, e) => total + (e.qtdPessoas ?? 0),
      0
    );
  }

  getEventos(): void {
    this.loading = true;
    this.spinner.show();

    this.eventoService
      .getEventos()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.spinner.hide();
          this.cdr.detectChanges(); // 🔥 garante sincronização
        })
      )
      .subscribe({
        next: eventos => {
          this.eventos = (eventos ?? []).map(evento => ({
            ...evento,
            dataEventoDate: this.converterParaDate(evento.dataEvento)
          }));

          this.eventosFiltrados = [...this.eventos];

          this.atualizarTotal(); // 🔥 atualiza total corretamente
        },

        error: () => {
          this.eventos = [];
          this.eventosFiltrados = [];
          this.totalParticipantes = 0;
          this.toastr.error('Erro ao carregar eventos');
        }
      });
  }

  openModal(event: any, template: TemplateRef<void>, id: number): void {
    event.stopPropagation();
    this.eventoId = id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm'
    });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId)
      .subscribe({
        next: () => {

          this.eventos = this.eventos.filter(e => e.id !== this.eventoId);
          this.eventosFiltrados = this.eventosFiltrados.filter(e => e.id !== this.eventoId);

          this.atualizarTotal(); // 🔥 recalcula total

          this.cdr.detectChanges(); // 🔥 resolve NG0100 definitivamente

          this.toastr.success('Evento excluído com sucesso', 'Deletado');
        },
        error: () => {
          this.toastr.error('Erro ao excluir evento', 'Erro');
        },
        complete: () => this.spinner.hide()
      });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  filtrarEventos(event: Event) {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();

    this.eventosFiltrados = this.eventos.filter(e =>
      e.tema.toLowerCase().includes(valor) ||
      e.local.toLowerCase().includes(valor)
    );
  }

  private initParticles(): void {
    this.particles = Array.from({ length: 30 }).map(() => ({
      x: `${Math.random() * 100}%`,
      d: `${Math.random() * 20 + 10}s`,
      s: `${Math.random() * 4 + 2}px`
    }));
  }

  converterParaDate(data: string): Date {
    const [dataParte, horaParte] = data.split(' ');
    const [dia, mes, ano] = dataParte.split('/').map(Number);
    const [hora, minuto, segundo] = horaParte.split(':').map(Number);

    return new Date(ano, mes - 1, dia, hora, minuto, segundo);
  }

  private initMouseGlow(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.mouseMoveListener = (e: MouseEvent) => {
      const glow = document.querySelector('.mouse-glow') as HTMLElement;
      if (!glow) return;

      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', this.mouseMoveListener);
  }

  private initCanvasNetwork(): void {
    if (!this.canvas) return;

    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const points = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() - 0.5,
      vy: Math.random() - 0.5
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = '#a855f7';
        ctx.fillRect(p.x, p.y, 2, 2);

        points.forEach(p2 => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(168,85,247,${1 - d / 130})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }
}