import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register';
import { Iusers } from '../../iusers';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb=inject(FormBuilder);
 constructor(private reg:RegisterService,private router:Router){}
  registerform=this.fb.group({
    id:['',[Validators.required]],
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    mobilenumber:['',[Validators.required,Validators.maxLength(10)]]
  })
  
  submit(){
    const formValue=this.registerform.value;
    const user={
      id:Number(formValue.id)!,
      name:formValue.name!,
      email:formValue.email!,
      password:formValue.password!,
      mobilenumber:Number(formValue.mobilenumber)!
    }

       this.reg.AddUsers(user).subscribe(()=>{
          this.router.navigateByUrl('login');
       })
    
    console.log(this.registerform.value);
    
     }
  }

