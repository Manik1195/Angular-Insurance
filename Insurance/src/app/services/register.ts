import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iusers } from '../iusers';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  apiurl = 'http://localhost:3000/Users';
  AddUsers(users: Iusers) {
    return this.http.post<Iusers>(this.apiurl, users);
  }
  ValidateUser(username: any, password: any) {
    return this.http.get<Iusers[]>(`${this.apiurl}?email=${username}&password=${password}`);
  }
}
