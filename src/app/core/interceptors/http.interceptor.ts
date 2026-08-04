// Importa a interface/função que permite criar um interceptor HTTP funcional.
// Interceptors ficam entre a aplicação e o servidor, podendo analisar,
// modificar ou tratar requisições e respostas HTTP.
import { HttpInterceptorFn } from '@angular/common/http';

// Importa o operador "tap" do RxJS.
// Ele permite executar ações quando uma resposta chega,
// sem alterar o fluxo dos dados.
import { tap } from 'rxjs';

// Importa o operador "catchError" do RxJS.
// Usado para capturar e tratar erros que acontecem durante a requisição.
import { catchError } from 'rxjs';

// Importa a função "throwError" do RxJS.
// Ela permite lançar novamente um erro depois de tratá-lo.
import { throwError } from 'rxjs';


// Cria um interceptor HTTP chamado "httpInterceptor".
// Ele recebe:
// - req: a requisição original enviada pela aplicação.
// - next: função que envia a requisição para o próximo passo (servidor ou outro interceptor).
export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  // Exibe no console a URL da requisição que está sendo interceptada.
  console.log('Interceptando Requisição: ', req.url);


  // Aqui poderia existir uma lógica para modificar a requisição antes do envio.
  // Exemplo: pegar um token salvo no LocalStorage ou SessionStorage.
  const token = 'fake-token-jwt';


  // Cria uma cópia da requisição original.
  // Requisições HTTP no Angular são imutáveis, então não podemos alterar "req" diretamente.
  // O método clone() cria uma nova versão modificada.
  const novaReq = req.clone({

    // Adiciona um novo cabeçalho HTTP na requisição.
    // Neste caso, adiciona um token JWT para autenticação.
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },

  });


  // Envia a nova requisição modificada para o servidor.
  // O método pipe() permite adicionar tratamentos na resposta.
  return next(novaReq).pipe(


    // O tap() observa o resultado da requisição.
    // Ele não modifica a resposta, apenas executa ações.
    tap({

      // Executado quando a resposta chega com sucesso.
      next: (event) => console.log('Resposta: ', event),


      // Executado quando ocorre algum erro na requisição.
      error: (error) => console.error('Erro de requisição: ', error),

    }),


    // Captura erros que acontecem durante a requisição.
    catchError((error) => {

      // Mostra o erro completo no console.
      console.error('Erro de requisição global: ', error);


      // Verifica se o erro foi de autenticação.
      // HTTP 401 significa "Não autorizado".
      if (error.status === 401) {
        console.warn('Erro de autenticação de Usuário!');
      }


      // Verifica se o erro veio do servidor.
      // HTTP 500 significa "Erro interno do servidor".
      if (error.status === 500) {
        console.warn('Erro interno do servidor!');
      }


      // Retorna o erro novamente para que a aplicação
      // consiga continuar tratando ele caso necessário.
      return throwError(() => error);

    }),

  );

};


// ================================
// EXEMPLO MAIS SIMPLES DE INTERCEPTOR
// ================================


// Importa o tipo do interceptor.
// import { HttpInterceptorFn } from '@angular/common/http';


// Cria um interceptor que apenas observa a requisição
// sem modificar nada.
// export const httpInterceptor: HttpInterceptorFn = (req, next) => {

//   Mostra no console a URL interceptada.
//   console.log('Interceptando Requisição: ', req.url);


//   Envia a requisição original sem alterações.
//   return next(req);

// };