import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.userService.adminLogin(loginData).subscribe({
        next: (res: any) => {
          console.log('Login success', res);

          // Save token if returned
          if (res.token) {
            localStorage.setItem('token', res.token);
          }

          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
        },
        error: (err) => {
          console.error('Login failed', err);
          this.snackBar.open('Invalid credentials', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/adminSign']);
  }
}
