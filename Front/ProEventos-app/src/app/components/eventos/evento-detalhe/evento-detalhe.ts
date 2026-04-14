import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../../services/evento-service';
import { Evento } from '../../../models/Evento';
import { Lote } from '../../../models/lote';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './evento-detalhe.html',
  styleUrls: ['./evento-detalhe.scss']
})
export class EventoDetalhe implements OnInit, AfterViewInit, OnDestroy {

  form!: FormGroup;
  lotesForm!: FormGroup;
  salvandoEvento = false;
  salvandoLotes  = false;
  eventoId = 0;
  particles: Array<{ x: string; d: string; s: string }> = [];

  @ViewChild('network') canvas!: ElementRef<HTMLCanvasElement>;
  private animationFrameId?: number;

  get modoEditar(): boolean {
    return this.eventoId > 0;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get lotes(): FormArray {
    return this.lotesForm.get('lotes') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForms();

    if (isPlatformBrowser(this.platformId)) this.initParticles();

    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (idParam && +idParam > 0) {  
      this.eventoId = +idParam;
      this.carregarEvento();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.initCanvasNetwork();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  private initForms(): void {
    this.form = this.fb.group({
      tema:       ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local:      ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone:   ['', Validators.required],
      email:      ['', [Validators.required, Validators.email]],
      imagemUrl:  ['', Validators.required],
    });

    this.lotesForm = this.fb.group({
      lotes: this.fb.array([])
    });
  }

  private carregarEvento(): void {
    this.spinner.show();

    this.eventoService.getEventoById(this.eventoId).subscribe({
      next: (evento: Evento) => {
        if (evento.dataEvento) {
          evento.dataEvento = new Date(evento.dataEvento).toISOString().slice(0, 16);
        }

        this.form.patchValue({
          tema:       evento.tema,
          local:      evento.local,
          dataEvento: evento.dataEvento,
          qtdPessoas: evento.qtdPessoas,
          telefone:   evento.telefone,
          email:      evento.email,
          imagemUrl:  evento.imagemUrl,
        });

        this.lotes.clear();
        if (evento.lotes?.length) {
          evento.lotes.forEach(lote => this.lotes.push(this.criarLoteFormGroup(lote)));
        }
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar evento:', err);
        this.toastr.error('Não foi possível carregar o evento.', 'Erro');
      },
      complete: () => this.spinner.hide()
    });
  }

  salvarEvento(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvandoEvento = true;
    this.spinner.show();

    const dadosEvento: Evento = {
      ...this.form.value,
      ...(this.modoEditar ? { id: this.eventoId } : {})
    };

    const operacao$ = this.modoEditar
      ? this.eventoService.putEvento(this.eventoId, dadosEvento)
      : this.eventoService.postEvento(dadosEvento);

    operacao$.subscribe({
      next: (eventoRetorno: Evento) => {
        this.toastr.success('Evento salvo com sucesso!', 'Sucesso');
        this.eventoId = eventoRetorno.id;
        this.router.navigate([`/eventos/detalhe/${eventoRetorno.id}`], { replaceUrl: true });
      },
      error: (err: unknown) => {
        console.error('Erro ao salvar evento:', err);
        this.toastr.error('Erro ao salvar o evento.', 'Erro');
        this.salvandoEvento = false;
        this.spinner.hide();
      },
      complete: () => {
        this.salvandoEvento = false;
        this.spinner.hide();
      }
    });
  }

  adicionarLote(): void {
    const novoLote: Lote = {
      id: 0,
      nome: '',
      preco: 0,
      quantidade: 0,
      dataInicio: new Date(),
      dataFim: new Date()
    };
    this.lotes.push(this.criarLoteFormGroup(novoLote));
  }

  removerLote(index: number): void {
    this.lotes.removeAt(index);
  }

  salvarLotes(): void {
    if (this.lotesForm.invalid) {
      this.lotesForm.markAllAsTouched();
      return;
    }

    this.salvandoLotes = true;
    this.spinner.show();

    const lotesParaSalvar: Lote[] = this.lotes.value as Lote[];

    this.eventoService.postLotes(this.eventoId, lotesParaSalvar).subscribe({
      next: (lotesRetorno: Lote[]) => {
        this.toastr.success('Lotes salvos com sucesso!', 'Sucesso');
        this.lotes.clear();
        lotesRetorno.forEach(lote => this.lotes.push(this.criarLoteFormGroup(lote)));
      },
      error: (err: unknown) => {
        console.error('Erro ao salvar lotes:', err);
        this.toastr.error('Erro ao salvar os lotes.', 'Erro');
        this.salvandoLotes = false;
        this.spinner.hide();
      },
      complete: () => {
        this.salvandoLotes = false;
        this.spinner.hide();
      }
    });
  }

  private criarLoteFormGroup(lote: Lote): FormGroup {
    const toInputDate = (date: Date | string | null | undefined): string => {
      if (!date) return '';
      return new Date(date).toISOString().slice(0, 16);
    };

    return this.fb.group({
      id:         [lote.id],
      nome:       [lote.nome,       Validators.required],
      preco:      [lote.preco,      [Validators.required, Validators.min(0)]],
      quantidade: [lote.quantidade, [Validators.required, Validators.min(1)]],
      dataInicio: [toInputDate(lote.dataInicio)],
      dataFim:    [toInputDate(lote.dataFim)],
    });
  }

  getLoteControl(index: number, campo: string): AbstractControl {
    return (this.lotes.at(index) as FormGroup).get(campo) as AbstractControl;
  }

  cssValidator(campo: AbstractControl | null): Record<string, boolean> {
    return { 'is-invalid': !!(campo?.errors && campo?.touched) };
  }

  cancelarAlteracao(): void {
    this.router.navigate(['/eventos/lista']);
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

    const resize = (): void => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const points = Array.from({ length: 70 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8
    }));

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = '#a855f7';
        ctx.fillRect(p.x, p.y, 2, 2);

        for (const p2 of points) {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(168,85,247,${1 - d / 130})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }
}