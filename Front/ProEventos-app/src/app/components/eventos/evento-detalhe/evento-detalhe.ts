import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './evento-detalhe.html',
  styleUrls: ['./evento-detalhe.scss']
})
export class EventoDetalhe implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup;
  particles: Array<{ x: string; d: string; s: string }> = [];

  @ViewChild('network') canvas!: ElementRef<HTMLCanvasElement>;
  private animationFrameId?: number;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
    if (isPlatformBrowser(this.platformId)) this.initParticles();
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
    });
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
