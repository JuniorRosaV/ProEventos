import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ValidadorField } from '../../helpers/validators-field';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class Perfil implements OnInit {

  tituloOpen = false;
  funcaoOpen = false;

  tituloSelecionado = '';
  funcaoSelecionada = 'Participante';

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidadorField.mustMatch('password', 'confirmPassword')
    };

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      funcao: ['', Validators.required],
      descricao: [''],

      // 🔥 senha opcional
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required]
    }, formOptions);
  }

  get f(): any {
    return this.form.controls;
  }

  toggleTitulo(event: Event) {
    event.stopPropagation();
    this.tituloOpen = !this.tituloOpen;
    this.funcaoOpen = false;
  }

  toggleFuncao(event: Event) {
    event.stopPropagation();
    this.funcaoOpen = !this.funcaoOpen;
    this.tituloOpen = false;
  }

  selectTitulo(valor: string) {
    this.tituloSelecionado = valor;
    this.form.get('titulo')?.setValue(valor);
    this.tituloOpen = false;
  }

  selectFuncao(valor: string) {
    this.funcaoSelecionada = valor;
    this.form.get('funcao')?.setValue(valor);
    this.funcaoOpen = false;
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.tituloOpen = false;
    this.funcaoOpen = false;
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Perfil salvo:', this.form.value);
  }
}
