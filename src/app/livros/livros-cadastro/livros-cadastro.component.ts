import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.css'],
})
export class LivrosCadastroComponent implements OnInit {
  private modo: string = 'criar';
  private idLivro: string;
  public livro: Livro;
  public estaCarregando: boolean = false;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      autor: new FormControl(null, {
        validators: [Validators.required],
      }),
      npaginas: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idLivro')) {
        this.modo = 'editar';
        this.idLivro = paramMap.get('idLivro');
        this.estaCarregando = true;
        this.livroService.getLivro(this.idLivro).subscribe((dadosLiv) => {
          this.estaCarregando = false;
          this.livro = {
            id: dadosLiv._id,
            titulo: dadosLiv.titulo,
            autor: dadosLiv.autor,
            npaginas: dadosLiv.npaginas,
          };
          this.form.setValue({
            titulo: this.livro.titulo,
            autor: this.livro.autor,
            npaginas: this.livro.npaginas,
          });
        });
      } else {
        this.modo = 'criar';
        this.idLivro = null;
      }
    });
  }

  constructor(
    public livroService: LivroService,
    public route: ActivatedRoute
  ) {}

  onCadastrarLivro() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === 'criar') {
      this.livroService.setLivro(
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.npaginas
      );
    } else {
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.npaginas
      );
    }

    this.form.reset();
  }
}
