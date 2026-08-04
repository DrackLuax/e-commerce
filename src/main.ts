// Importa a função responsável por iniciar (bootstrap)
// uma aplicação Angular baseada em componentes standalone.
import { bootstrapApplication } from '@angular/platform-browser';

// Importa as configurações da aplicação,
// como rotas, serviços e provedores.
import { appConfig } from './app/app.config';

// Importa o componente principal (raiz) da aplicação.
import { App } from './app/app';

// Inicializa a aplicação Angular utilizando
// o componente principal e as configurações definidas.
bootstrapApplication(App, appConfig)

  // Caso ocorra algum erro durante a inicialização,
  // ele será exibido no console do navegador.
  .catch((err) => console.error(err));