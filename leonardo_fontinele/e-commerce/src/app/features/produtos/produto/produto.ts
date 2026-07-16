import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, CurrencyPipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
// adcionando a classe Produto com as propriedades produto, preço, mostrarProduto, mostrarPreco
export class Produto {
  //entrada de dados da lista Produtos em lista-produtos
  @Input() nome: string = '';
  @Input() preco: number = 0;
  //Saída de dados de lista Produtos selecionados para lista-produtos
  @Output() produtoSelecionado = new EventEmitter<string>();
  selecionarProduto(){
    this.produtoSelecionado.emit(this.nome);
  }
}
