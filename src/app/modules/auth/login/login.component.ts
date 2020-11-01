import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errCode = ''
  loading = false
  hide = true // HIDE/SHOW PASSWORD

  constructor(private  authService:  AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    console.log('INIT LOGIN')
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    console.log(this.loginForm.value)
    this.errCode = ''

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      return
    }

    this.loading = true
    const {email, password} = this.loginForm.value

    this.authService.login(email, password)
      .then(
        (user: any) => {
          this.loading = false
          this.router.navigate(['home/feed'])
          console.log(user)
        }
      )
      .catch(
        err => {
          console.error(err)
          this.loading = false
          this.errCode = err.code
        }
      )
  }

  get l() { return this.loginForm.controls}
}
