import { Component, Inject, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss'
})
export class UserLayout {
  public router = inject(Router);
  public authService = inject(AuthService);

  isProduitRouteActive(): boolean {
    return this.router.url.includes('produit');
  }

  logout() {
    this.authService.logout();
  }
}