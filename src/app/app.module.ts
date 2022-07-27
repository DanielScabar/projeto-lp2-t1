import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LivrosListaComponent } from './livros/livros-lista/livros-lista.component';
import { LivrosCadastroComponent } from './livros/livros-cadastro/livros-cadastro.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    LivrosCadastroComponent,
    CabecalhoComponent,
    LivrosListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
