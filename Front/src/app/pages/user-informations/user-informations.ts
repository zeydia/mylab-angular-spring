import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-informations',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-informations.html',
  styleUrl: './user-informations.scss'
})
export class UserInformations {
  public authService = inject(AuthService);
  private userService = inject(UserService);

  actualPassword = "";
  newPassword = "";
  newPasswordConfirm = "";
  
  message = signal("");
  isError = signal(false);

  updatepassword() {
    const user = this.authService.currentUserValue;

    if (!user || !user.id) return;

    if (this.newPassword !== this.newPasswordConfirm) {
      this.showMessage("Les nouveaux mots de passe ne correspondent pas", true);
      return;
    }

    const payload = {
      currentPassword: this.actualPassword,
      newPassword: this.newPassword
    };

    this.userService.updatePassword(user.id, payload).subscribe({
      next: () => {
        this.showMessage("Mot de passe mis à jour avec succès !", false);
        this.resetForm();
        this.authService.logout();
      },
      error: () => {
        this.showMessage("Erreur lors de la mise à jour. Vérifiez votre mot de passe actuel.", true);
      }
    });
  }

  private showMessage(text: string, error: boolean) {
    this.message.set(text);
    this.isError.set(error);
    setTimeout(() => this.message.set(""), 3000);
  }

  private resetForm() {
    this.actualPassword = "";
    this.newPassword = "";
    this.newPasswordConfirm = "";
  }
}