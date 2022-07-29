import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';
import {LivroService} from '../livro.service';

@Component({
  selector:'app-livros-cadastro',
  templateUrl:'./livros-cadastro.component.html',
  styleUrls:['./livros-cadastro.component.css']
})

export class LivrosCadastroComponent implements OnInit{

  private modo:string = "criar";
  private idLivro: string;
  public livro: Livro;
  public estaCarregando: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("idLivro")){
        this.modo = "editar";
        this.idLivro = paramMap.get("idLivro");
        this.estaCarregando = true;
        this.livroService.getLivro(this.idLivro).subscribe(dadosLiv => {
          this.estaCarregando = false;
          this.livro = {
            id: dadosLiv._id,
            titulo: dadosLiv.titulo,
            autor: dadosLiv.autor,
            npaginas: dadosLiv.npaginas
          }
        });
      }
      else{
        this.modo = "criar";
        this.idLivro = null;
      }
    })
  }

  constructor(public livroService:LivroService, public route: ActivatedRoute){}

  onCadastrarLivro(form: NgForm){
    if(form.invalid){
      return;
    }
    this.estaCarregando = true;
    if(this.modo === "criar"){
      this.livroService.setLivro(
        form.value.titulo,
        form.value.autor,
        form.value.npaginas
      );
    }
    else{
      this.livroService.atualizarLivro(
        this.idLivro,
        form.value.titulo,
        form.value.autor,
        form.value.npaginas
      )
    }
    
    form.resetForm();
  }
}