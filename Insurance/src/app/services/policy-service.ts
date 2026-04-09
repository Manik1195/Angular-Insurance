import { inject, Injectable } from '@angular/core';
import { Policy } from '../components/policy/policy';
import { HttpClient } from '@angular/common/http';
import { IPolicy } from '../i-policy';
import { IcreatePolicy } from '../icreate-policy';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private http = inject(HttpClient);
  apiurl = 'http://localhost:3100/Policies';
  addPolicy(data: IcreatePolicy) {
    return this.http.post(this.apiurl, data);
  }
  getPolicy() {
    return this.http.get<IPolicy[]>(this.apiurl, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  }
  getPolicyById(id: number) {
    return this.http.get<IPolicy>(`${this.apiurl}/${id}`);
  }
  updatePolicy(id: number, data: IcreatePolicy) {
    return this.http.put(`${this.apiurl}/${id}`, data);
  }
  deletePolicy(id: number) {
    return this.http.delete(`${this.apiurl}/${id}`);
  }
}
