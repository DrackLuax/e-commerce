import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core'
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from  '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!Lista com dados - Array
  produtos = signal([
    {nome:'RTX 5090', preco: 12999.99},
    {nome:'R5 5600G', preco: 599.99},
    {nome:'32GB RAM DDR4 3600HZ', preco: 949.99},
  ]);
  //!Função para exibir produtos selecionados no console
  exibirProduto (nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  //!Função que adiciona produto usando metodo update
  adcionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }
  //!Função que contabiliza a quantidade de produtos na lista com metodo computed()
  totalProdutos = computed(()=> this.produtos().length);
  //!Função que calcula o valor total dos produtos netodo computed() 
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0)});
  //função para substituir a lista atual usando metodo set()
  substituirProdutos(){
    this.produtos.set([
      {nome:'teclado', preco: 50},
      {nome:'mouse', preco: 15},
      {nome:'monitor', preco: 500},
      {nome:'desktop', preco: 1500},
      {nome:'headset', preco: 30},
    ])
  } 
  //! metodo para monitorar alterações em tempo real usando effect
  constructor(){
    effect(() => {
      console.log('Lista de Produtos alterados: ', this.produtos());
    });
    effect(() => {
      console.log('Valor total atualizado: ', this.valorTotal());
    });
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) - Loja do AbsoluteMalex`
      }
    });
  }
  //! Metodo para criar um estado de seleção com signal string | null
  produtoSelecionado = signal <string | null>(null);
}
