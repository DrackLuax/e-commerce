import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = [
    {nome:'RTX 5090', preco: 12999.99},
    {nome:'R5 5600G', preco: 599.99},
    {nome:'32GB RAM DDR4 3600HZ', preco: 949.99},
  ];
}
