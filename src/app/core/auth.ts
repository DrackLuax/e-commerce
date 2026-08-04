
// Importa o recurso Signal do Angular.
// Signals permitem criar valores reativos que avisam automaticamente
// os componentes quando o valor muda.
import { signal } from '@angular/core';


// Cria um Signal chamado "usuarioLogado".
// O valor inicial é false, ou seja:
// por padrão, o sistema considera que nenhum usuário está autenticado.
//
// Como é um signal, qualquer parte da aplicação que estiver observando
// esse valor será atualizada automaticamente quando ele mudar.
export const usuarioLogado = signal(false);


// Função responsável por realizar o login do usuário.
//
// Quando essa função é chamada, o signal recebe o valor true,
// indicando que existe um usuário autenticado.
export function login() {

  // Altera o valor do signal.
  // O método set() atualiza o estado e notifica automaticamente
  // todos os componentes que usam esse valor.
  usuarioLogado.set(true);

}


// Função responsável por realizar o logout do usuário.
//
// Quando chamada, informa ao sistema que o usuário saiu.
export function logout() {

  // Altera o estado do usuário para deslogado.
  usuarioLogado.set(false);

}