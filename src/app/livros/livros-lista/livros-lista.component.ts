import { Component, OnInit, Input } from '@angular/core';
import {Livro} from '../livro.model';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent implements OnInit {
  @Input() livros: Livro[] = [];


  constructor() { }

  ngOnInit(): void {
  }

}
