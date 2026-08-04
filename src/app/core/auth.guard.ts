
// Importa o tipo CanActivateFn.
// Ele permite criar um "guard" funcional de rota no Angular.
// Guards são usados para controlar se o usuário pode ou não acessar uma página.
import { CanActivateFn } from '@angular/router';


// Importa a função usuarioLogado.
// Essa função provavelmente verifica se existe um usuário autenticado,
// por exemplo, verificando um token ou uma sessão ativa.
import { usuarioLogado } from './auth';


// Cria um guard chamado authGuard.
// O tipo CanActivateFn indica que ele será executado antes de ativar uma rota.
// Ele deve retornar:
// - true  → permite o acesso à página.
// - false → bloqueia o acesso à página.
// - UrlTree → pode redirecionar para outra rota.
export const authGuard: CanActivateFn = () => {


  // Executa a função usuarioLogado().
  // O resultado dessa função define se a rota será liberada ou bloqueada.
  return usuarioLogado();

};