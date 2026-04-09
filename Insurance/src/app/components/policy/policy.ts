import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyService } from '../../services/policy-service';
import { form } from '@angular/forms/signals';
import { IPolicy } from '../../i-policy';
import { log } from 'console';
import { Router } from '@angular/router';
import { IcreatePolicy } from '../../icreate-policy';

@Component({
  selector: 'app-policy',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './policy.html',
  styleUrl: './policy.css',
})
export class Policy {
  private fb = inject(FormBuilder);
  private policyserv = inject(PolicyService);
  private router = inject(Router);

  policyform = this.fb.group({
    customer: this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    }),
    policy: this.fb.group({
      type: ['', [Validators.required]],
      sumAssured: ['', [Validators.required]],
    }),
    nominees: this.fb.array([]),
    premium: this.fb.group({
      amount: ['', [Validators.required]],
      mode: ['', [Validators.required]],
    }),
  });
  get nominees() {
    return this.policyform.get('nominees') as FormArray;
  }
  getNomineeForm() {
    return this.fb.group({
      nomineeName: ['', [Validators.required]],
      relation: ['', [Validators.required]],
    });
  }
  addNominee() {
    this.nominees.push(this.getNomineeForm());
  }
  removeNominee(i: number) {
    this.nominees.removeAt(i);
  }
  currentStep = signal(1);
  totalsteps = 4;
  prev() {
    if (this.currentStep() > 1) {
      this.currentStep.update((v) => v - 1);
    }
  }
  next() {
    if (!this.isStepValid()) {
      this.markStepTouched();
      return;
    }
    if (this.currentStep() < this.totalsteps) {
      this.currentStep.update((v) => v + 1);
    }
  }
  submit() {
    // console.log('Hi');
    // console.log(this.policyform.value);
    // console.log(this.policyform.valid);
    // console.log(this.policyform.errors);

    const formValue = this.policyform?.value;
    const payload: IcreatePolicy = {
      customer: {
        name: formValue?.customer?.name!,
        age: Number(formValue?.customer?.age),
        mobile: Number(formValue?.customer?.mobile),
      },
      policy: {
        type: formValue?.policy?.type!,
        sumAssured: Number(formValue?.policy?.sumAssured),
      },
      nominees:
        formValue.nominees?.map((n: any) => ({
          nomineeName: n.nomineeName!,
          relation: n.relation!,
        })) || [],
      premium: {
        amount: Number(formValue?.premium?.amount),
        mode: formValue.premium?.mode!,
      },
    };
    console.log(payload);

    this.policyserv.addPolicy(payload).subscribe(() => {
      alert('Policy added successfully');
      this.router.navigateByUrl('home');
    });
  }

  isStepValid() {
    if (this.currentStep() === 1) {
      return this.policyform.get('customer')?.valid;
    }
    if (this.currentStep() === 2) {
      return this.policyform.get('policy')?.valid;
    }
    if (this.currentStep() === 3) {
      return this.nominees.length > 0 && this.nominees?.valid;
    }
    if (this.currentStep() === 4) {
      return this.policyform.get('premium')?.valid;
    }
    return true;
  }
  markStepTouched() {
    if (this.currentStep() === 1) {
      this.policyform.get('customer')?.markAllAsTouched();
    }
    if (this.currentStep() === 2) {
      this.policyform.get('policy')?.markAllAsTouched();
    }
    if (this.currentStep() === 3) {
      this.nominees.controls.forEach((c) => c.markAllAsTouched());
    }
    if (this.currentStep() == 4) {
      this.policyform.get('premium')?.markAllAsTouched();
    }
  }
}
