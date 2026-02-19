import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../services/evento-service';
import { Evento } from '../../../models/Evento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-evento-carregar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule     
  ],
  templateUrl: './evento-carregar.html',
  styleUrls: ['./evento-carregar.scss']
})
export class EventoCarregar implements OnInit {

  evento: Evento | null = null;


  Favorito = false;
  Registro = false;
  Comentario = '';

  carregar = true;

  CategoriaDeCores: any = {
    Hackathon: { bg: 'purple', text: 'purple', border: 'purple' },
    Conferencia: { bg: 'blue', text: 'blue', border: 'blue' },
    Meetup: { bg: 'pink', text: 'pink', border: 'pink' },
    Workshop: { bg: 'cyan', text: 'cyan', border: 'cyan' },
  };

  comments: Comment[] = [
    {
      id: '1',
      author: 'Ana Silva',
      avatar: 'AS',
      content: 'Evento incrível! Mal posso esperar.',
      timestamp: 'há 2 horas'
    },
    {
      id: '2',
      author: 'Carlos Santos',
      avatar: 'CS',
      content: 'Haverá certificado?',
      timestamp: 'há 5 horas'
    }
  ];

  constructor(
    private router: ActivatedRoute,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.loadEvent(+id);
    }
  }

  loadEvent(id: number): void {

    this.carregar = true;

    this.eventoService.getEventoById(id).subscribe({
      next: (evento) => {

        this.evento = {
          ...evento,
          dataEvento: new Date(evento.dataEvento).toLocaleDateString(),
          horario: new Date(evento.dataEvento).toLocaleTimeString(),
          TodaDescricao: evento.descricao
        };

        this.carregar = false;
      },

      error: (err) => {
        console.error('Erro ao carregar evento', err);
        this.carregar = false;
      }
    });
  }

  get spotsLeft(): number {
  if (!this.evento) return 0;
    return (this.evento.maxPessoas ?? 0) - (this.evento.qtdPessoas ?? 0);
  }


  get occupationPercent(): number {
    if (!this.evento) return 0;
    return Math.round(
      (this.evento.qtdPessoas / this.evento.maxPessoas) * 100
    );
  }

  toggleFavorite(): void {
    this.Favorito = !this.Favorito;
  }

  toggleRegister(): void {
    this.Registro = !this.Registro;
  }

  share(): void {

    if (!this.evento) return;
    
    if (navigator.share) {

      navigator.share({
        title: this.evento.tema,
        text: this.evento.descricao,
        url: window.location.href
      });

    }

  }

  goBack(): void {
    window.history.back();
  }

}
