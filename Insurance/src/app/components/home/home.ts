import { Component, inject, OnInit, signal } from '@angular/core';
import { PolicyService } from '../../services/policy-service';
import { IPolicy } from '../../i-policy';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  policies = signal<IPolicy[]>([]);
  private policyserv = inject(PolicyService);
  private router = inject(Router);
  ngOnInit(): void {
    this.getPolicies();
    console.log('init called');
  }

  getPolicies() {
    console.log('Api call started');
    this.policyserv.getPolicy().subscribe((res) => {
      console.log('Length:', res.length);
      console.log('TYPE:', typeof res);

      console.log('FIRST ITEM:', res[0]);
      console.log('Raw response', res);
      console.log('lenght', res.length);
      this.policies.set(res);
      console.log('Data:', this.policies());
      console.log('Api responsed');
    });
  }
  Edit(id: number) {
    this.router.navigate(['/editpolicy', id]);
    console.log('edit clicked');
  }
  Delete(i: number) {
    console.log('i', i);
    this.policyserv.deletePolicy(i).subscribe({
      next: () => {
        alert('Deleted successfully ✅');

        // optional: refresh list or navigate
        // this.loadData();
        // OR
        this.policies.update((list) => list.filter((p) => p.id !== i));
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed ❌');
      },
    });
  }
}
