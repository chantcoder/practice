import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup,FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private router:Router,private formBuilder:FormBuilder) { }

  passPattern = '^[a-zA-Z0-9]{10}';
  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    // console.table(this.loginForm.value);
    if(this.loginForm.invalid){
      return
    }
    this.login();
  }

  login(){
    this.router.navigateByUrl('dashboard/home');
  }
}
