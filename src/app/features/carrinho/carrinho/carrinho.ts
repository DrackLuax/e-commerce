import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  carrinhoFacade = inject(CarrinhoFacade);

  removerItem(indice: number) {
    this.carrinhoFacade.removerItem(indice);
  }

  limparCarrinho() {
    this.carrinhoFacade.limparCarrinho();
  }
}