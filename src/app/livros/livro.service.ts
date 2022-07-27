import {Livro} from './livro.model';

export class LivroService{
  private livros:Livro[] = [];

  getLivros():Livro[]{
    return [...this.livros];
  }

  setLivro(id:string,titulo:string,autor:string,npaginas:string){
    const livro:Livro = {
      id:id,
      titulo:titulo,
      autor:autor,
      npaginas:npaginas
    };
    this.livros.push(livro); 
  }
}