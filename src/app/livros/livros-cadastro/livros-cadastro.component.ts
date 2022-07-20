import {Component} from '@angular/core';

@Component({
  selector:'app-livros-cadastro',
  templateUrl:'./livros-cadastro.component.html',
})

export class LivrosCadastroComponent {
  id:string;
  titulo:string;
  autor:string;
  npaginas:string;
  
  onCadastrarLivro(){
    console.log("Inserindo Livro...");
  }
}