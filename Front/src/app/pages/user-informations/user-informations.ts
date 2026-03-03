import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-informations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-informations.html',
  styleUrl: './user-informations.scss',
})
export class UserInformations {


  actualPassword: any;
  newPassword: any;
  newPasswordConfirm: any;
  updatepassword() {
    throw new Error('Method not implemented.');
  }
}
