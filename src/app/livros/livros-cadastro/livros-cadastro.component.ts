import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector:'app-livros-cadastro',
  templateUrl:'./livros-cadastro.component.html',
  styleUrls:['./livros-cadastro.component.css']
})

export class LivrosCadastroComponent {
  @Output() livroAdicionado = new EventEmitter;
  
  id:string;
  titulo:string;
  autor:string;
  npaginas:string;

  onCadastrarLivro(){
    const livro = {
      id: this.id,
      titulo: this.titulo,
      autor: this.autor,
      npaginas: this.npaginas
    };
    this.livroAdicionado.emit(livro);
  }
}