import { Component } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {}
