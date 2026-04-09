import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  getUsers() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(
      map((users) => {
        return users.map((user) => ({
          id: user.id,
          email: user.email,
        }));
      }),
    );
  }
  getUserById() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users/3').pipe(
      map((user: any) => {
        return user.address;
      }),
    );
  }
}
