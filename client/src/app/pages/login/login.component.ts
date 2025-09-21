import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {

  constructor(private router: Router) {}

  login() {
    // Here you would typically handle the authentication logic
    // For now, we'll just navigate to the home page
    this.router.navigate(['/home']);
  }
}