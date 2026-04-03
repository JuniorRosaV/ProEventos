import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable(
  // {providedIn: 'root'}
  )
export class EventoService 
{
  baseURLLotes = 'https://localhost:7074/api/Lotes';
  baseURL = 'https://localhost:7074/api/evento';
  constructor(private http: HttpClient) {}
  public getEventos() : Observable<Evento[]>
  {
    return this.http.get<Evento[]>(this.baseURL).pipe(take(1));
  }
  public getEventosByTema(tema: string) : Observable<Evento[]>
  {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`).pipe(take(1));
  }
  public getEventoById(id: number) : Observable<Evento>
  {
    return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
  }
  public postEvento(evento: Evento) : Observable<Evento>
  {
    return this.http.post<Evento>(this.baseURL, evento);
  }
  public putEvento(id: number, evento: Evento) : Observable<Evento>
  {
    return this.http.put<Evento>(`${this.baseURL}/${id}`, evento);
  }
  public deleteEvento(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  postLotes(eventoId: number, lotes: any[]) {
  return this.http.post(
    `${this.baseURLLotes}/${eventoId}`,
    lotes
  );
}
}
