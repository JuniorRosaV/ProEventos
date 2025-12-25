import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Titulo } from '../../shared/titulo/titulo';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterModule, Titulo],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Eventos implements OnInit, AfterViewInit {

  @ViewChild('network') canvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    // Mouse glow
    window.addEventListener('mousemove', e => {
      const glow = document.querySelector('.mouse-glow') as HTMLElement;
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    });
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d')!;

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

      requestAnimationFrame(animate);
    };

    animate();
  }
}
