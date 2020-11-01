import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        console.log('USER: ', user)
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        console.log('NO USER')
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
  }

  async register(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.signOut().then(
      res => {
        console.log(res)
        localStorage.removeItem('user');
        this.router.navigate(['auth/login']);
      }
    ).catch(
      err => {
        console.error(err)
      }
    )
    
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  // async  loginWithGoogle(){
  //   await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  //   this.router.navigate(['admin/list']);
  // }

}
