import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService 
{
  baseURL = 'https://localhost:7074/api/evento';
  constructor(private http: HttpClient) {}
  getEventos() : Observable<Evento[]>
  {
    return this.http.get<Evento[]>(this.baseURL);
  }
  getEventosByTema(tema: string) : Observable<Evento[]>
  {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`);
  }
  getEventoById(id: number) : Observable<Evento>
  {
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }
  postEvento(evento: Evento) : Observable<Evento>
  {
    return this.http.post<Evento>(this.baseURL, evento);
  }
  putEvento(id: number, evento: Evento) : Observable<Evento>
  {
    return this.http.put<Evento>(`${this.baseURL}/${id}`, evento);
  }
  deleteEvento(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }
}
