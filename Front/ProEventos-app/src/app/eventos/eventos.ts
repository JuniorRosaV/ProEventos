import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';           
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-eventos',
  standalone: true,              
  imports: [],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss']  
})
export class Eventos {
  public eventos : any ;

  constructor(private http: HttpClient){}
  
  ngOnInit(): void{
    this.getEventos();
  }


  public getEventos():void
  {
      this.http.get('http://localhost:5074/api/evento').subscribe(
        response => this.eventos = response,
        error => console.log(error)
      );
  }
}
