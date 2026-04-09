import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { App } from './app';
import { Register } from './auth/register/register';
import { Home } from './components/home/home';
import { authGuardGuard } from './auth-guard-guard';
import { Policy } from './components/policy/policy';
import { Heading } from './components/heading/heading';
import { EditPolicy } from './components/edit-policy/edit-policy';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ⭐ best practice
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home, canActivate: [authGuardGuard] },
  { path: 'heading', component: Heading, canActivate: [authGuardGuard] },
  { path: 'policy', component: Policy, canActivate: [authGuardGuard] },
  { path: 'editpolicy/:id', component: EditPolicy, canActivate: [authGuardGuard] },
];
