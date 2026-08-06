// Importa o Component para criar um componente Angular.
// Importa inject para realizar injeção de dependência de serviços.
import { Component, inject } from '@angular/core';

// Importa o componente Produto.
// Ele será utilizado no HTML para exibir cada produto individualmente.
import { Produto } from '../produto/produto';

// Importa o recurso Signal do Angular.
// Signals armazenam estados reativos e atualizam a tela automaticamente
// quando seus valores são alterados.
import { signal } from '@angular/core';

// Importa computed.
// Usado para criar valores calculados automaticamente a partir de Signals.
import { computed } from '@angular/core';

// Importa um Pipe personalizado responsável por formatar preços.
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

// Importa effect.
// Permite executar uma função sempre que um Signal utilizado dentro dela mudar.
import { effect } from '@angular/core';

// Importa o serviço responsável pela comunicação com a API de produtos.
import { produtosService } from '../produtos.service';

@Component({
  // Nome da tag que representa esse componente no HTML.
  // Exemplo:
  // <app-lista-produtos></app-lista-produtos>
  selector: 'app-lista-produtos',

  // Componentes e Pipes que serão utilizados dentro do HTML.
  imports: [Produto, PrecoFormatadoPipe],

  // Arquivo HTML vinculado ao componente.
  templateUrl: './lista-produtos.html',

  // Arquivo CSS responsável pelos estilos.
  styleUrl: './lista-produtos.css',
})

// Classe principal do componente.
export class ListaProdutos {
  //!======================= SIGNALS ===========================

  // Signal que armazena a lista de produtos.

  // Estrutura esperada:
  // [
  //   { nome: "Mouse", preco: 50 },
  //   { nome: "Teclado", preco: 100 }
  // ]

  // Começa com uma lista vazia.
  produtos = signal<{ nome: string; preco: number }[]>([]);

  // Controla o estado de carregamento.

  // true  -> buscando produtos da API.
  // false -> terminou a busca.
  carregando = signal(true);

  // Guarda o produto selecionado pelo usuário.

  // string -> possui um produto selecionado.
  // null   -> nenhum produto selecionado.
  produtoSelecionado = signal<string | null>(null);

  // Signal que armazena os produtos adicionados ao carrinho.
  carrinho = signal<{ nome: string; preco: number }[]>([]);

  // Guarda mensagens de erro.

  // null -> sem erro.
  // string -> mensagem de erro.
  erro = signal<string | null>(null);

  //?======================== COMPUTED =========================

  // Computed que calcula automaticamente
  // a quantidade total de produtos.

  // Sempre que produtos() mudar,
  // esse valor será atualizado.
  totalProdutos = computed(() => this.produtos().length);

  // Computed que calcula o valor total
  // de todos os produtos da lista.

  // O reduce percorre cada produto
  // e soma todos os preços.
  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });

  // Calcula automaticamente a quantidade
  // de itens existentes no carrinho.
  quantidadeCarrinho = computed(() => this.carrinho().length);

  // Calcula o valor total dos produtos
  // adicionados no carrinho.
  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });

  //**================ MÉTODO HTTP CLIENT (API) =================

  // Método responsável por buscar produtos na API.
  carregarProduto() {
    // Remove mensagens de erro antigas
    // antes de iniciar uma nova requisição.
    this.erro.set(null);

    // Ativa o estado de carregamento.
    // Enquanto for true, o HTML mostra "Carregando..."
    this.carregando.set(true);

    // Chama o serviço responsável pela requisição HTTP.
    //
    // subscribe recebe:
    // next  -> quando a API retorna sucesso.
    // error -> quando ocorre algum problema.
    this.produtosService.buscarProduto().subscribe({
      // Executado quando a API responde corretamente.
      next: (dados) => {
        // Transforma os dados recebidos da API
        // para o formato esperado pela aplicação.
        const produtos = this.produtosService.transformarProdutos(dados);

        // Atualiza o Signal com os produtos recebidos.
        this.produtos.set(produtos);

        // Finaliza o carregamento.
        this.carregando.set(false);
      },

      // Executado quando ocorre erro na requisição.
      error: (erro) => {
        // Mostra o erro no console.
        console.error('Erro ao carregar produtos: ', erro);

        // Envia uma mensagem de erro para o HTML.
        this.erro.set('Erro ao carregar produtos. Por favor, tente novamente!');

        // Finaliza o carregamento
        // para evitar que a tela fique travada.
        this.carregando.set(false);
      },
    });
  }

  //**============================= CONSTRUCTOR =========================

  constructor() {
    // Ao criar o componente,
    // busca automaticamente os produtos da API.
    this.carregarProduto();

    // Effect executado sempre que a lista
    // de produtos sofrer alguma alteração.
    effect(() => {
      console.log('Lista de Produtos alterados: ', this.produtos());
    });

    // Effect que observa mudanças no valor total.
    effect(() => {
      console.log('Valor total atualizado: ', this.valorTotal());
    });

    // Effect que altera o título da aba do navegador.
    effect(() => {
      // Verifica se o código está rodando no navegador.
      if (typeof document !== 'undefined') {
        // Atualiza o título mostrando
        // a quantidade de produtos.
        //
        // Exemplo:
        // (10) - Loja do Leo
        document.title = `(${this.totalProdutos()}) - Loja do Leo`;
      }
    });
  }

  //**============================= MÉTODO UPDATE ========================

  // Adiciona um novo produto usando update().

  // update recebe o valor atual do Signal
  // e cria uma nova lista adicionando o item.
  adicionarProduto() {
    this.produtos.update((listaAtual) => [
      ...listaAtual,

      {
        nome: 'playstation 5',
        preco: 3000,
      },
    ]);
  }

  // Adiciona um produto dentro do carrinho.

  // Recebe um produto como parâmetro
  // e adiciona na lista atual.
  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update((listaAtual) => [...listaAtual, produto]);
  }

  // Substitui completamente a lista atual.

  // Diferente do update(), o set()
  // troca todo o conteúdo do Signal.
  substituirProdutos() {
    this.produtos.set([
      {
        nome: 'teclado',
        preco: 50,
      },

      {
        nome: 'mouse',
        preco: 15,
      },

      {
        nome: 'monitor',
        preco: 500,
      },

      {
        nome: 'desktop',
        preco: 1500,
      },

      {
        nome: 'headset',
        preco: 30,
      },
    ]);
  }

  //**================ MÉTODO EXISTENTE (NÃO MEXER) =================

  // Método chamado quando um produto é selecionado.

  // Recebe o nome do produto,
  // mostra no console
  // e atualiza o Signal produtoSelecionado.
  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

  //**========================= INJECT ===========================

  // Injeta o serviço de produtos.

  // Esse serviço é responsável por:
  // - Fazer chamadas HTTP para a API.
  // - Buscar produtos.
  // - Transformar dados recebidos.
  private produtosService = inject(produtosService);
}
