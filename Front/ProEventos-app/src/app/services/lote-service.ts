import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '../models/lote';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs';

@Injectable(
   {providedIn: 'root'}
  )
export class LoteService {
   baseURL = 'https://localhost:7074/api/Lotes';
  constructor(private http: HttpClient) {}
  public getLotesByEventoId(eventoId: number) : Observable<Lote[]>
  {
    return this.http.get<Lote[]>(`${this.baseURL}/${eventoId}`).pipe(take(1));
  }

  public saveLote(EventoId: number, Lote: Lote[]) : Observable<Lote[]>
  {
    return this.http.put<Lote[]>(`${this.baseURL}/${EventoId}`, Lote).pipe(take(1));
  }

  public deleteLote(EventoId: number, LoteId: number): Observable<void>
  {
    return this.http.delete<void>(`${this.baseURL}/${EventoId}/${LoteId}`).pipe(take(1));
  }
}
