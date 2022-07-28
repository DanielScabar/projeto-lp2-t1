import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LivrosCadastroComponent } from "./livros/livros-cadastro/livros-cadastro.component";
import { LivrosListaComponent } from "./livros/livros-lista/livros-lista.component";

const routes: Routes = [
  {path:"", component: LivrosListaComponent},
  {path:"criar", component: LivrosCadastroComponent}
];
@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{

}