
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.signin = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.pattern(/^\S*$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)]],
    });
  }

  ngOnInit() {}

  getErrorMessage(controlName: string) {
    const control = this.signin.get(controlName);
    if (control && control.invalid) {
      if (control.hasError('required')) {
        return 'Debe ingresar un valor';
      }
      if (control.hasError('minlength')) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
      if (control.hasError('pattern') && controlName === 'email') {
        return 'El email no puede contener espacios';
      }
      if (control.hasError('pattern') && controlName === 'password') {
        return 'La contraseña no puede contener espacios';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.signin.valid) {
      console.log('Form values:', this.signin.value);
    }
  }
  
  save(): void {

    const email = this.signin.get('email')
    const password = this.signin.get('password')

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
      this.signin.reset();
    }, (error:any) => {
      this.isLoggingIn = false;
      this.snackBar.open('Las credenciales no son correctas. Intente de nuevo', 'Cerrar',{
        duration: 4000
      });
    })
  }

}