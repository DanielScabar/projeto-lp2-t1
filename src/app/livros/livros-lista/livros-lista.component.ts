import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent implements OnInit {
  @Input() livros = [];


  constructor() { }

  ngOnInit(): void {
  }

}
