import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent implements OnInit {
  livros = [
    {
      id:"1",
      titulo:"O Iluminado",
      autor:"Stephen King",
      npaginas:"300" 
    },
    {
      id:"2",
      titulo:"O Cemitério",
      autor:"Stephen King",
      npaginas:"220" 
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
