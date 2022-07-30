import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesaparecidosCadastroComponent } from './desaparecidos/desaparecidos-cadastro/desaparecidos-cadastro.component';
import { DesaparecidosListaComponent } from './desaparecidos/desaparecidos-lista/desaparecidos-lista.component';

const routes: Routes = [
  { path: '', component: DesaparecidosListaComponent },
  { path: 'criar', component: DesaparecidosCadastroComponent },
  { path: 'editar/:idDesaparecido', component: DesaparecidosCadastroComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
