import {Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import {LivroService} from '../livro.service';

@Component({
  selector:'app-livros-cadastro',
  templateUrl:'./livros-cadastro.component.html',
  styleUrls:['./livros-cadastro.component.css']
})

export class LivrosCadastroComponent {
  constructor(public livroService:LivroService){}

  onCadastrarLivro(form: NgForm){
    if(form.invalid){
      return;
    }
    this.livroService.setLivro(
      form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.npaginas
    )
  }
}