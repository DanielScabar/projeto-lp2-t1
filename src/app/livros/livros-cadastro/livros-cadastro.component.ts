import {Component} from '@angular/core';

@Component({
  selector:'app-livros-cadastro',
  templateUrl:'./livros-cadastro.component.html',
  styleUrls:['./livros-cadastro.component.css']
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