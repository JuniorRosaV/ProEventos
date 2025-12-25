import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './evento-detalhe.html',
  styleUrls: ['./evento-detalhe.scss']
})
export class EventoDetalhe implements OnInit {
  form!: FormGroup;

  get f():any{
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {this.validation();} 

  public validation(): void {
  this.form = this.fb.group({
    tema: ['',      [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],

    local: ['', Validators.required],

    dataEvento: ['', Validators.required],

    qtdPessoas: [
      '',
      [Validators.required, Validators.max(120000)]
    ],

    telefone: ['', Validators.required],

    email: [
      '',
      [Validators.required, Validators.email]
    ],

    imagemUrl: ['', Validators.required],
  });
}



}
