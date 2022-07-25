import {Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Livro} from '../livro.model';

@Component({
  selector:'app-livros-cadastro',
  templateUrl:'./livros-cadastro.component.html',
  styleUrls:['./livros-cadastro.component.css']
})

export class LivrosCadastroComponent {
  @Output() livroAdicionado = new EventEmitter<Livro>();
  
  id:string;
  titulo:string;
  autor:string;
  npaginas:string;

  onCadastrarLivro(form: NgForm){
    if(form.invalid){
      return;
    }
    const livro: Livro = {
      id: form.value.id,
      titulo: form.value.titulo,
      autor: form.value.autor,
      npaginas: form.value.npaginas
    };
    this.livroAdicionado.emit(livro);
  }
}