import { Injectable } from '@angular/core';
import { Desaparecido } from './desaparecido.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DesaparecidoService {
  private desaparecidos: Desaparecido[] = [];
  private listaDesaparecidosAtualizada = new Subject<Desaparecido[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getDesaparecidos(): void {
    this.httpClient
      .get<{ mensagem: string; desaparecidos: any }>(
        'http://localhost:3000/api/desaparecidos'
      )
      .pipe(
        map((dados) => {
          return dados.desaparecidos.map((desaparecido) => {
            return {
              id: desaparecido._id,
              nome: desaparecido.nome,
              idade: desaparecido.idade,
              telefone: desaparecido.telefone,
              imagemURL: desaparecido.imagemURL,
            };
          });
        })
      )
      .subscribe((desaparecidos) => {
        this.desaparecidos = desaparecidos;
        this.listaDesaparecidosAtualizada.next([...this.desaparecidos]);
      });
  }

  setDesaparecido(nome: string, idade: string, telefone: string, imagem: File) {
    // const desaparecido: Desaparecido = {
    //   nome: nome,
    //   idade: idade,
    //   telefone: telefone,
    // };
    const dadosDesaparecido = new FormData();
    dadosDesaparecido.append('nome', nome);
    dadosDesaparecido.append('idade', idade);
    dadosDesaparecido.append('telefone', telefone);
    dadosDesaparecido.append('imagem', imagem);
    this.httpClient
      .post<{ mensagem: string; id: string; desaparecido: Desaparecido }>(
        'http://localhost:3000/api/desaparecidos',
        dadosDesaparecido
      )
      .subscribe((dados) => {
        // desaparecido.id = dados.id;
        const desaparecido: Desaparecido = {
          id: dados.id,
          nome: nome,
          idade: idade,
          telefone: telefone,
          imagemURL: dados.desaparecido.imagemURL,
        };
        this.desaparecidos.push(desaparecido);
        this.listaDesaparecidosAtualizada.next([...this.desaparecidos]);
        this.router.navigate(['/']);
      });
  }

  getListaDeDesaparecidosAtualizadaObservable() {
    return this.listaDesaparecidosAtualizada.asObservable();
  }

  removerDesaparecido(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/desaparecidos/${id}`)
      .subscribe(() => {
        this.desaparecidos = this.desaparecidos.filter((cli) => {
          return cli.id !== id;
        });
        this.listaDesaparecidosAtualizada.next([...this.desaparecidos]);
      });
  }
  getDesaparecido(idDesaparecido: string) {
    //return { ...this.desaparecidos.find((desaparecido) => desaparecido.id === idDesaparecido) };
    return this.httpClient.get<{
      _id: string;
      nome: string;
      idade: string;
      telefone: string;
    }>(`http://localhost:3000/api/desaparecidos/${idDesaparecido}`);
  }

  atualizarDesaparecido(
    id: string,
    nome: string,
    idade: string,
    telefone: string
  ) {
    const desaparecido: Desaparecido = {
      id,
      nome,
      idade,
      telefone,
      imagemURL: null,
    };
    this.httpClient
      .put(`http://localhost:3000/api/desaparecidos/${id}`, desaparecido)
      .subscribe((res) => {
        const copia = [...this.desaparecidos];
        const indice = copia.findIndex((liv) => liv.id === desaparecido.id);
        copia[indice] = desaparecido;
        this.desaparecidos = copia;
        this.listaDesaparecidosAtualizada.next([...this.desaparecidos]);
        this.router.navigate(['/']);
      });
  }
}
