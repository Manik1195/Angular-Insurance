import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register';
import { Authservice } from '../../authservice';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private reg = inject(RegisterService);
  private auth = inject(Authservice);
  loginform = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  submit() {
    const { username, password } = this.loginform.value;
    this.reg.ValidateUser(username, password).subscribe((res) => {
      if (res.length > 0) {
        alert('Login success');
        this.auth.setToken('random123');
        this.router.navigateByUrl('home');
      } else {
        alert('invalid username or password');
      }
    });
  }
  register() {
    this.router.navigateByUrl('/register');
  }
}
