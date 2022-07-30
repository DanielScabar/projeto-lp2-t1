import { Component } from '@angular/core';
import { Desaparecido } from './desaparecidos/desaparecido.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  desaparecidos: Desaparecido[] = [];
  onDesaparecidoCadastrado(desaparecido) {
    this.desaparecidos = [...this.desaparecidos, desaparecido];
  }
}
