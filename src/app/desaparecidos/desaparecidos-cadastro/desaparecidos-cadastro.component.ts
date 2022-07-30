import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Desaparecido } from '../desaparecido.model';
import { DesaparecidoService } from '../desaparecido.service';
import { mimeTypeValidator } from './mime-type.validator';

@Component({
  selector: 'app-desaparecidos-cadastro',
  templateUrl: './desaparecidos-cadastro.component.html',
  styleUrls: ['./desaparecidos-cadastro.component.css'],
})
export class DesaparecidosCadastroComponent implements OnInit {
  private modo: string = 'criar';
  private idDesaparecido: string;
  public desaparecido: Desaparecido;
  public estaCarregando: boolean = false;
  form: FormGroup;
  previewImagem: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      idade: new FormControl(null, {
        validators: [Validators.required],
      }),
      telefone: new FormControl(null, {
        validators: [Validators.required],
      }),
      imagem: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idDesaparecido')) {
        this.modo = 'editar';
        this.idDesaparecido = paramMap.get('idDesaparecido');
        this.estaCarregando = true;
        this.desaparecidoService
          .getDesaparecido(this.idDesaparecido)
          .subscribe((dadosLiv) => {
            this.estaCarregando = false;
            this.desaparecido = {
              id: dadosLiv._id,
              nome: dadosLiv.nome,
              idade: dadosLiv.idade,
              telefone: dadosLiv.telefone,
              imagemURL: null,
            };
            this.form.setValue({
              nome: this.desaparecido.nome,
              idade: this.desaparecido.idade,
              telefone: this.desaparecido.telefone,
            });
          });
      } else {
        this.modo = 'criar';
        this.idDesaparecido = null;
      }
    });
  }

  constructor(
    public desaparecidoService: DesaparecidoService,
    public route: ActivatedRoute
  ) {}

  onCadastrarDesaparecido() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === 'criar') {
      this.desaparecidoService.setDesaparecido(
        this.form.value.nome,
        this.form.value.idade,
        this.form.value.telefone,
        this.form.value.imagem
      );
    } else {
      this.desaparecidoService.atualizarDesaparecido(
        this.idDesaparecido,
        this.form.value.nome,
        this.form.value.idade,
        this.form.value.telefone
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
