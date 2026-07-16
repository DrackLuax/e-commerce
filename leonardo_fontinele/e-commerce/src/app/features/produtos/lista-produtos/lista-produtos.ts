import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    {nome:'RTX 5090', preco: 12999.99},
    {nome:'R5 5600G', preco: 599.99},
    {nome:'32GB RAM DDR4 3600HZ', preco: 949.99},
  ]);
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
  }
}
