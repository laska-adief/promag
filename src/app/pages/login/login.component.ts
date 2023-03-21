import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    console.log(this.loginForm);

    if (
      !this.loginForm.get('username')?.value ||
      !this.loginForm.get('password')?.value
    ) {
      this.loginForm.markAllAsTouched();
    }

    if (
      this.loginForm.get('username')?.value &&
      this.loginForm.get('username')?.value !== 'admin'
    ) {
      this.loginForm.get('username')?.setErrors({ invalidUsername: true });
    }

    if (
      this.loginForm.get('password')?.value &&
      this.loginForm.get('password')?.value !== 'admin'
    ) {
      this.loginForm.get('password')?.setErrors({ invalidPassword: true });
    }

    if (
      this.loginForm.value?.username === 'admin' &&
      this.loginForm.value?.password === 'admin'
    ) {
      this.authService.login(this.generateRandomToken());
      this.router.navigate(['home']);
    }
  }

  generateRandomToken() {
    const token = Math.random().toString(36).replace('.', '');
    return token;
  }
}
