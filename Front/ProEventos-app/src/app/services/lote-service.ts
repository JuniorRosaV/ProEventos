import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '../models/lote';
import { Observable } from 'rxjs';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoteService {

  baseURL = 'https://localhost:7074/api/Lotes';

  constructor(private http: HttpClient) {}

  public getLotesByEventoId(eventoId: number): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseURL}/${eventoId}`).pipe(take(1));
  }

  public postLote(eventoId: number, lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(`${this.baseURL}/${eventoId}`, [lote]).pipe(take(1));
  }

  public putLote(eventoId: number, lote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${this.baseURL}/${eventoId}/${lote.id}`, lote).pipe(take(1));
  }

  public deleteLote(eventoId: number, loteId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${eventoId}/${loteId}`).pipe(take(1));
  }
}