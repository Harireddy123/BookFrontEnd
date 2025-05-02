import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-admin-signup',
  standalone: false,
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.scss',
})
export class AdminSignupComponent implements OnInit {
  signupForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get firstNameControl() {
    return this.signupForm.get('firstName');
  }
  get lastNameControl() {
    return this.signupForm.get('lastName');
  }
  get emailControl() {
    return this.signupForm.get('email');
  }
  get passwordControl() {
    return this.signupForm.get('password');
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const reqData = this.signupForm.value;
      this.userService.adminRegister(reqData).subscribe({
        next: (response) => {
          this.snackBar.open('Registration successful', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Registration failed', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/adminLogin']);
  }
}
