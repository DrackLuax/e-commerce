import { Component, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../produtos.service';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!=======================SIGNALS===========================
  produtos = signal<{ nome: string; preco: number }[]>([]);

  carregando = signal(true);

  produtoSelecionado = signal<string | null>(null);

  carrinho = signal<{ nome: string; preco: number }[]>([]);

  //?========================COMPUTED=========================

  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });

  //totalProduto = computed(() =>this.produto(). length);
  quantidadeCarrinho = computed(() => this.carrinho().length);

  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });
  //**==========================MÉTODO HTTP CRIENT (API)========================================== */

  carregarProduto() {
    this.carregando.set(true);
    this.produtosService.buscarProduto().subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos: ', erro);
        this.carregando.set(false);
      },
    });
  }

  //**=============================CONSTRUCTOR======================== */
  constructor() {
    //! carrega a API
    this.carregarProduto();

    effect(() => {
      console.log('lista de Produtos alterados: ', this.produtos());
    });
    effect(() => {
      console.log('Valor total atualizado: ', this.valorTotal());
    });
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) - loja do arthurzinho gamaplayes`;
      }
    });
  }
  //**===================================MÉTODO UPDATE=====================================
  adicionarProduto() {
    this.produtos.update((listaAtual) => [...listaAtual, { nome: 'playstation 5', preco: 3000 }]);
  }
  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update((listaAtual) => [...listaAtual, produto]);
  }
  //!função para substituir a lista atual usando o metod set()
  substituirProdutos() {
    this.produtos.set([
      { nome: 'teclado', preco: 50 },
      { nome: 'mouse', preco: 15 },
      { nome: 'monitor', preco: 500 },
      { nome: 'desktop', preco: 1500 },
      { nome: 'headset', preco: 30 },
    ]);
  }
  //**=============================métoddo existente (não mexer)=============================== */
  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  //**=====================INJECT ============================== */

  private produtosService = inject(produtosService);
}
