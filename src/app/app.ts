import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // remove a importação de router Outlet, pois não é necessário para esse componente
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  nomeLoja = 'Mercado Branco';
}
