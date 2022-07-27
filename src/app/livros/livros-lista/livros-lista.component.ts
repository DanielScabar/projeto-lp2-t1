import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css'],
})
export class LivrosListaComponent implements OnInit {
  livros: Livro[] = [];

  constructor(public livroService: LivroService) {}

  ngOnInit(): void {
    this.livros = this.livroService.getLivros();
    this.livroService
      .getListaDeLivrosAtualizadaObservable()
      .subscribe((livros: Livro[]) => {
        this.livros = livros;
      });
  }
}
