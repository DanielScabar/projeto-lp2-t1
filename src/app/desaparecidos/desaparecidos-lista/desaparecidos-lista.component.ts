import { Component, OnInit, OnDestroy } from '@angular/core';
import { Desaparecido } from '../desaparecido.model';
import { DesaparecidoService } from '../desaparecido.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-desaparecidos-lista',
  templateUrl: './desaparecidos-lista.component.html',
  styleUrls: ['./desaparecidos-lista.component.css'],
})
export class DesaparecidosListaComponent implements OnInit, OnDestroy {
  desaparecidos: Desaparecido[] = [];
  private desaparecidosSubscription: Subscription;
  public estaCarregando = false;

  constructor(public desaparecidoService: DesaparecidoService) {}

  ngOnInit(): void {
    this.estaCarregando = true;
    this.desaparecidoService.getDesaparecidos();
    this.desaparecidosSubscription = this.desaparecidoService
      .getListaDeDesaparecidosAtualizadaObservable()
      .subscribe((desaparecidos: Desaparecido[]) => {
        this.estaCarregando = false;
        this.desaparecidos = desaparecidos;
      });
  }

  ngOnDestroy(): void {
    this.desaparecidosSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.desaparecidoService.removerDesaparecido(id);
  }
}
