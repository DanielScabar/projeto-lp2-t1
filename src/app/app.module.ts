import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LivrosCadastroComponent } from './livros/livros-cadastro/livros-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    LivrosCadastroComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
