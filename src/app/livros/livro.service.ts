import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getLivros(): void {
    this.httpClient
      .get<{ mensagem: string; livros: any }>(
        'http://localhost:3000/api/livros'
      )
      .pipe(
        map((dados) => {
          return dados.livros.map((livro) => {
            return {
              id: livro._id,
              titulo: livro.titulo,
              autor: livro.autor,
              npaginas: livro.npaginas,
              imagemURL: livro.imagemURL,
            };
          });
        })
      )
      .subscribe((livros) => {
        this.livros = livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      });
  }

  setLivro(titulo: string, autor: string, npaginas: string, imagem: File) {
    // const livro: Livro = {
    //   titulo: titulo,
    //   autor: autor,
    //   npaginas: npaginas,
    // };
    const dadosLivro = new FormData();
    dadosLivro.append('titulo', titulo);
    dadosLivro.append('autor', autor);
    dadosLivro.append('npaginas', npaginas);
    dadosLivro.append('imagem', imagem);
    this.httpClient
      .post<{ mensagem: string; id: string; livro: Livro }>(
        'http://localhost:3000/api/livros',
        dadosLivro
      )
      .subscribe((dados) => {
        // livro.id = dados.id;
        const livro: Livro = {
          id: dados.id,
          titulo: titulo,
          autor: autor,
          npaginas: npaginas,
          imagemURL: dados.livro.imagemURL,
        };
        this.livros.push(livro);
        this.listaLivrosAtualizada.next([...this.livros]);
        this.router.navigate(['/']);
      });
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

  removerLivro(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/livros/${id}`)
      .subscribe(() => {
        this.livros = this.livros.filter((cli) => {
          return cli.id !== id;
        });
        this.listaLivrosAtualizada.next([...this.livros]);
      });
  }
  getLivro(idLivro: string) {
    //return { ...this.livros.find((livro) => livro.id === idLivro) };
    return this.httpClient.get<{
      _id: string;
      titulo: string;
      autor: string;
      npaginas: string;
    }>(`http://localhost:3000/api/livros/${idLivro}`);
  }

  atualizarLivro(id: string, titulo: string, autor: string, npaginas: string) {
    const livro: Livro = { id, titulo, autor, npaginas, imagemURL: null };
    this.httpClient
      .put(`http://localhost:3000/api/livros/${id}`, livro)
      .subscribe((res) => {
        const copia = [...this.livros];
        const indice = copia.findIndex((liv) => liv.id === livro.id);
        copia[indice] = livro;
        this.livros = copia;
        this.listaLivrosAtualizada.next([...this.livros]);
        this.router.navigate(['/']);
      });
  }
}
