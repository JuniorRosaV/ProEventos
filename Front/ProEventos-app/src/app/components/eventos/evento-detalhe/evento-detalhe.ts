import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../../services/evento-service';
import { Evento } from '../../../models/Evento';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoteService } from '../../../services/lote-service';
import { Lote } from '../../../models/lote';

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './evento-detalhe.html',
  styleUrls: ['./evento-detalhe.scss']
})
export class EventoDetalhe implements OnInit, AfterViewInit, OnDestroy {

  form!: FormGroup;
  evento = {} as Evento;
  eventoId = 0;

  particles: Array<{ x: string; d: string; s: string }> = [];

  @ViewChild('network') canvas!: ElementRef<HTMLCanvasElement>;
  private animationFrameId?: number;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: ActivatedRoute,
    private route: Router,
    private eventoService: EventoService,
    private loteService: LoteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  get f(): any {
    return this.form.controls;
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  ngOnInit(): void {
    this.validation();
    if (isPlatformBrowser(this.platformId)) this.initParticles();
    this.carregarEvento();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.initCanvasNetwork();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemUrl: ['', Validators.required],
      lotes: this.fb.array([])
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }
  
  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: ['', Validators.required],
      preco: [lote.preco, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required],
    });
  }


  removeLote(index: number): void {
    this.lotes.removeAt(index);
  }

  public carregarEvento(): void {

    const id = this.router.snapshot.paramMap.get('id');

    if (!id) return;

    this.eventoId = +id;

    this.eventoService.getEventoById(this.eventoId).subscribe({
      next: (evento) => {

        this.evento = evento;

        if (evento.dataEvento) {
          const data = new Date(evento.dataEvento);
          evento.dataEvento = data.toISOString().slice(0, 16);
        }

        this.form.patchValue(evento);

        this.lotes.clear();

        if (evento.lotes?.length) {

          evento.lotes.forEach((lote: any) => {

            const dataInicio = lote.dataInicio
              ? new Date(lote.dataInicio).toISOString().slice(0, 16)
              : '';

            const dataFim = lote.dataFim
              ? new Date(lote.dataFim).toISOString().slice(0, 16)
              : '';

            this.lotes.push(this.fb.group({
              id: [lote.id],
              nome: [lote.nome],
              preco: [lote.preco],
              quantidade: [lote.quantidade],
              dataInicio: [dataInicio],
              dataFim: [dataFim],
            }));
          });
        }
      },
      error: (err: any) => console.error(err)
    });
  }

  CancelarAlteracao(): void {
    this.route.navigate(['/eventos/lista']);
  }

  public salvarAlteracao(): void {

    if (this.form.invalid) return;

    this.spinner.show();

    const formValue = this.form.value;

    // 🔥 AJUSTA DATAS
    formValue.lotes?.forEach((l: any) => {
      if (l.dataInicio) l.dataInicio = new Date(l.dataInicio).toISOString();
      if (l.dataFim) l.dataFim = new Date(l.dataFim).toISOString();
    });

    const evento: Evento = {
      id: this.eventoId,
      ...formValue
    };

    const request$ = this.eventoId > 0
      ? this.eventoService.putEvento(this.eventoId, evento)
      : this.eventoService.postEvento(evento);

    request$.subscribe({

      next: (eventoRetorno: any) => {

        const eventoId = eventoRetorno.id ?? this.eventoId;
        const lotes = formValue.lotes;

        if (lotes && lotes.length > 0) {

          this.loteService.saveLote(eventoId, lotes).subscribe({
            next: () => {
              this.toastr.success('Salvo com sucesso!', 'Sucesso');
              this.route.navigate(['/eventos']);
            },
            error: (err: any) => {
              console.error(err);
              this.toastr.error('Erro ao salvar lotes', 'Erro');
              this.spinner.hide();
            }
          });

        } else {
          this.toastr.success('Salvo com sucesso!', 'Sucesso');
          this.route.navigate(['/eventos']);
        }

      },

      error: (error: any) => {
        console.error(error);
        this.toastr.error('Erro ao salvar evento', 'Erro');
        this.spinner.hide();
      },

      complete: () => this.spinner.hide()
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {
      'is-invalid': campoForm?.errors && campoForm?.touched
    };
  }

  private initParticles(): void {
    this.particles = Array.from({ length: 30 }).map(() => ({
      x: `${Math.random() * 100}%`,
      d: `${Math.random() * 20 + 10}s`,
      s: `${Math.random() * 4 + 2}px`
    }));
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