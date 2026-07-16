import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router'; // remove a importação de router Outlet, pois não é necessário para esse componente
// import { Produto } from './components/produto/produto'; // importando a classe produto do arquivo produto.ts para ser usado no componente app.ts
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
@Component({
  selector: 'app-root',
  imports: [ListaProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
