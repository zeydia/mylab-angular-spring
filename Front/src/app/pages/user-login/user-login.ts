import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss',
})
export class UserLogin {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = "";
  password = "";
  errorMessage = "";

  onLogin() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (user) => {
        this.router.navigate(['/produit-list']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
        } else {
          this.errorMessage = "Une erreur technique est survenue.";
        }
      }
    });
  }
}