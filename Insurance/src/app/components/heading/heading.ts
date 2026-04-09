import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Title } from '../title/title';
import { Iusers } from '../../iusers';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-heading',
  imports: [Title],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
})
export class Heading implements OnInit {
  private api = inject(ApiService);
  click = signal(false);
  address = signal<any>({});
  user: Iusers = {
    id: 1,
    name: 'Sivs',
    email: 'Sivs@gmail.com',
    password: '12345',
    mobilenumber: 1234,
  };
  apiUser = signal<{ id: number; email: string }[]>([]);
  msg = 'message to title';
  // values = 'Welcome';
  email = '';
  names = 'Hello manik';

  submit(e: string) {
    this.email = e;
  }
  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.apiUser.set(res);
    });
  }
  Submit() {
    console.log('before upate', this.click());
    this.click.update((v) => !v);
    console.log('after update', this.click());
    this.api.getUserById().subscribe((res) => {
      this.address.set(res);
      console.log(this.address());
    });
  }
}
