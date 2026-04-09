import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../services/policy-service';
import { IPolicy } from '../../i-policy';
import { CommonModule, JsonPipe } from '@angular/common';
import { IcreatePolicy } from '../../icreate-policy';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-policy',
  imports: [JsonPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-policy.html',
  styleUrl: './edit-policy.css',
})
export class EditPolicy implements OnInit {
  private fb = inject(FormBuilder);
  private policyserv = inject(PolicyService);
  private router = inject(Router);
  private paramroute = inject(ActivatedRoute);
  form = this.fb.group({
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
  id = this.paramroute.snapshot.params['id'];
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.policyserv.getPolicyById(this.id).subscribe((data: any) => {
      // ✅ Handle normal fields
      this.form.patchValue({
        customer: data.customer,
        policy: data.policy,
        premium: data.premium,
      });

      // ❗ Handle FormArray separately
      this.setNominees(data.nominees);
    });
  }
  setNominees(nominees: any[]) {
    this.nominees.clear();

    nominees.forEach((n) => {
      this.nominees.push(
        this.fb.group({
          nomineeName: [n.nomineeName, Validators.required],
          relation: [n.relation, Validators.required],
        }),
      );
    });

    // ✅ Optional: if empty
    if (nominees.length === 0) {
      this.addNominee();
    }
  }
  get nominees() {
    return this.form.get('nominees') as FormArray;
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
  // submit() {
  //   // console.log('Hi');
  //   // console.log(this.policyform.value);
  //   // console.log(this.policyform.valid);
  //   // console.log(this.policyform.errors);

  //   const formValue = this.form?.value;
  //   const payload: IcreatePolicy = {
  //     customer: {
  //       name: formValue?.customer?.name!,
  //       age: Number(formValue?.customer?.age),
  //       mobile: Number(formValue?.customer?.mobile),
  //     },
  //     policy: {
  //       type: formValue?.policy?.type!,
  //       sumAssured: Number(formValue?.policy?.sumAssured),
  //     },
  //     nominees:
  //       formValue.nominees?.map((n: any) => ({
  //         nomineeName: n.nomineeName!,
  //         relation: n.relation!,
  //       })) || [],
  //     premium: {
  //       amount: Number(formValue?.premium?.amount),
  //       mode: formValue.premium?.mode!,
  //     },
  //   };
  //   console.log(payload);

  //   this.policyserv.addPolicy(payload).subscribe(() => {
  //     alert('Policy added successfully');
  //     this.router.navigateByUrl('home');
  //   });
  // }

  isStepValid() {
    if (this.currentStep() === 1) {
      return this.form.get('customer')?.valid;
    }
    if (this.currentStep() === 2) {
      return this.form.get('policy')?.valid;
    }
    if (this.currentStep() === 3) {
      return this.nominees.length > 0 && this.nominees?.valid;
    }
    if (this.currentStep() === 4) {
      return this.form.get('premium')?.valid;
    }
    return true;
  }
  markStepTouched() {
    if (this.currentStep() === 1) {
      this.form.get('customer')?.markAllAsTouched();
    }
    if (this.currentStep() === 2) {
      this.form.get('policy')?.markAllAsTouched();
    }
    if (this.currentStep() === 3) {
      this.nominees.controls.forEach((c: any) => c.markAllAsTouched());
    }
    if (this.currentStep() == 4) {
      this.form.get('premium')?.markAllAsTouched();
    }
  }
  submit() {
    if (this.form.invalid) {
      this.markStepTouched();
      return;
    }

    const formValue = this.form.value;

    const payload: IcreatePolicy = {
      customer: {
        name: formValue.customer?.name!,
        age: Number(formValue.customer?.age),
        mobile: Number(formValue.customer?.mobile),
      },
      policy: {
        type: formValue.policy?.type!,
        sumAssured: Number(formValue.policy?.sumAssured),
      },
      nominees:
        formValue.nominees?.map((n: any) => ({
          nomineeName: n.nomineeName,
          relation: n.relation,
        })) || [],
      premium: {
        amount: Number(formValue.premium?.amount),
        mode: formValue.premium?.mode!,
      },
    };

    console.log('UPDATE PAYLOAD:', payload);

    // ✅ Call UPDATE API (not add)
    this.policyserv.updatePolicy(this.id, payload).subscribe({
      next: () => {
        alert('Policy updated successfully ✅');
        this.router.navigateByUrl('home');
      },
      error: (err) => {
        console.error(err);
        alert('Update failed ❌');
      },
    });
  }
}
