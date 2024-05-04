
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signin!: FormGroup;
  hide = true;
  isLoggingIn = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.signin = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  get emailInput() {
    return this.signin.get('email');
  }

  get passwordInput() {
    return this.signin.get('password');
  }

  getErrorMessage(controlName: string) {
    const control = this.signin.get(controlName);
    if (control && control.invalid) {
      if (control.hasError('required')) {
        return 'Debe ingresar un valor';
      }
      return control.hasError('minlength') ? 'La contraseña debe tener al menos 6 caracteres' : '';
    }
    return '';
  }

  onSubmit() {
    if (this.signin.valid) {
      console.log('Form values:', this.signin.value); // Log the entire form values
    }
  }

  login() {
    this.isLoggingIn = true;

    console.log('Email:', this.emailInput?.value);
    console.log('Password:', this.passwordInput?.value);

    // Your existing code follows...
  }

  save(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}