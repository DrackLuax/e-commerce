import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, CurrencyPipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
// adcionando a classe Produto com as propriedades produto, preço, mostrarProduto, mostrarPreco
export class Produto {
  @Input() nome: string = '';
  @Input() preco: number = 0;
}
