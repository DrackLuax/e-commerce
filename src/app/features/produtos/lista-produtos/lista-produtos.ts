import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe,UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //! SIGNALS

  //!lista com dados - Array
  produtos = signal<{ nome: string; preco: number }[]>([]);

  carregando = signal(true);

  //!metodo para criar um estado de seleção com signal string / null
  produtoSelecionado = signal<string | null>(null);

  //!metodo para criar um estado para carrinho com signal
  carrinho = signal<{ nome: string; preco: number }[]>([]);

  //! COMPUTED

  //!função que contabiliza a quantidade de produtos na lista com o metodo computed()
  totalProdutos = computed(() => this.produtos().length);

  //!funcao que calcula o valor total do produtos usando o metodo computed()
  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });

  //!metodo para calcular a quantidade total de itens no carrinho
  quantidadeCarrinho = computed(() => this.carrinho().length);

  //!metodo que calcula o valor total dos itens do carrinho
  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });

  //! METODO HTTP CLIENT (API)
  carregarProdutos(){
    this.carregando.set(true);
    this.http.get<{title: string; price: number}[]>
    ('https://fakestoreapi.com/products').subscribe({
      next: (dados) => {
        const produtosFormatados = dados.map(p =>({
          nome: p.title,
          preco: p.price,
        }));
        this.produtos.set(produtosFormatados);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos: ', erro);
        this.carregando.set(false);
      }
    });
  }

  //! METODO UPDATE
  //!funcão que adiciona produtos usando metodo update()
  adicionarProduto() {
    this.produtos.update((listaAtual) => [...listaAtual, { nome: 'Playstation 5', preco: 3000 }]);
  }

  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update((listaAtual) => [...listaAtual, produto]);
  }

  //!função para substituir a lista atual usando o metodo set()
  substituirProdutos() {
    this.produtos.set([
      { nome: 'Teclado', preco: 50 },
      { nome: 'Mouse', preco: 15 },
      { nome: 'Monitor', preco: 500 },
      { nome: 'Desktop', preco: 1500 },
      { nome: 'Headset', preco: 30 },
    ]);
  }

  //! CONSTRUCTOR

  //!metodo para monitorar as alterações em tempo real usando effect()
  //**Carrega a API**/
  constructor(private http: HttpClient) {
    //**Carrega a API**/
    this.carregarProdutos();

    //!effect continuam iguais - não mexer
    effect(() => {
      console.log('Lista de Produtos Alterados: ', this.produtos());
    });

    effect(() => {
      console.log('Valor Total Atualizado: ', this.valorTotal());
    });

    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) - Sunrise Store`;
      }
    });
  }

  //! NÃO MEXER
  //!função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
}
