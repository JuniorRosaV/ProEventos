import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Particle {
  x: number;
  d: number;
  s: number;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.scss']
})
export class Registration implements OnInit, AfterViewInit {

  particles: Particle[] = [];

  @ViewChild('network') canvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    /* Partículas (Angular-safe) */
    this.particles = Array.from({ length: 35 }).map(() => ({
      x: Math.random(),
      d: Math.random() * 20,
      s: Math.random()
    }));

    /* Mouse glow */
    window.addEventListener('mousemove', (e: MouseEvent) => {
      const glow = document.querySelector('.mouse-glow') as HTMLElement;
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = Array.from({ length: 60 }).map(() => ({
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

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.fillStyle = '#a855f7';
        ctx.fillRect(p.x, p.y, 2, 2);

        points.forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(168,85,247,${1 - dist / 120})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }
}
