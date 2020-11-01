import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  errCode =''
  loading = false

  constructor(private  authService:  AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [],
      password: []
    })
  }

  register(){
    console.log(this.registerForm.value)
    const {email, password} = this.registerForm.value
    this.authService.register(email, password)
      .then(
        (user: any) => {
          this.router.navigate(['home/feed'])
          console.log(user)
        }
      )
      .catch(
        err => {
          console.error(err)
          if(err.code === 'auth/invalid-email'){
            console.log('Please provide a valid email')
          }
      
          if(err.code === 'auth/email-already-in-use'){
            console.log('An account with this email already exists')
          }
      
          if(err.code === 'auth/weak-password'){
            console.log('Weak password')
          }
        }
      )
  }

  get l() { return this.registerForm.controls }
}
