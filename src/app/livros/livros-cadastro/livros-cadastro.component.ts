import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { mimeTypeValidator } from './mime-type.validator';

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
  previewImagem: string;

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
      imagem: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
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
            imagemURL: null,
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
        this.form.value.npaginas,
        this.form.value.imagem
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

  onImagemSelecionada(event: Event) {
    const arquivo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imagem: arquivo });
    this.form.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImagem = reader.result as string;
    };
    reader.readAsDataURL(arquivo);
  }
}
