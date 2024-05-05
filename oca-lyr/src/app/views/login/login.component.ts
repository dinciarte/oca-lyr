
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
  
  save(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  login() {
    this.save();
    
    this.isLoggingIn = true;

    const email = this.signin.get('email')
    const password = this.signin.get('password')

    console.log(email?.value);
    console.log(password?.value);
    
    this.authService.signIn({
      email: email?.value,
      password: password?.value
    }).subscribe(() => {
      this.router.navigate(['home']); 
    }, (error:any) => {
      this.isLoggingIn = true;
    })
  }

}