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
import { RouterModule } from '@angular/router';
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

  /* =======================
     VIEW
  ======================= */
  @ViewChild('network') canvas!: ElementRef<HTMLCanvasElement>;

  modalRef?: BsModalRef;

  /* =======================
     DADOS
  ======================= */
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];

  loading = false;
  mostrarImagem = true;

  /* =======================
     PARTÍCULAS
  ======================= */
  particles: Array<{ x: string; d: string; s: string }> = [];

  /* =======================
     CONTROLE
  ======================= */
  private animationFrameId?: number;
  private mouseMoveListener?: (e: MouseEvent) => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) { }

  /* =======================
     CICLO DE VIDA
  ======================= */

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

  /* =======================
     GETTERS
  ======================= */

  get totalParticipantes(): number {
    return this.eventos.reduce(
      (total, e) => total + (e.qtdPessoas ?? 0),
      0
    );
  }

  /* =======================
     API
  ======================= */

  getEventos(): void {
    this.loading = true;
    this.spinner.show();

    this.eventoService
      .getEventos()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.spinner.hide();
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: eventos => {
          this.eventos = eventos ?? [];
          this.eventosFiltrados = [...this.eventos];
        },
        error: () => {
          this.eventos = [];
          this.eventosFiltrados = [];
          this.toastr.error('Erro ao carregar eventos');
        }
      });
  }

  /* =======================
     MODAL
  ======================= */

  openModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm'
    });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Evento excluído com sucesso');
  }

  decline(): void {
    this.modalRef?.hide();
  }

  /* =======================
     ANIMAÇÕES
  ======================= */

  /** 🔥 Partículas flutuantes */
  private initParticles(): void {
    this.particles = Array.from({ length: 30 }).map(() => ({
      x: `${Math.random() * 100}%`,
      d: `${Math.random() * 20 + 10}s`,
      s: `${Math.random() * 4 + 2}px`
    }));
  }

  /* FILTRO DE EVENTOS */

  filtrarEventos(event: Event) {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();

    this.eventosFiltrados = this.eventos.filter(e =>
      e.tema.toLowerCase().includes(valor) ||
      e.local.toLowerCase().includes(valor)
    );
  }

  /** 🔥 Glow seguindo o mouse */
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

  /** 🔥 Canvas com partículas conectadas */
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
