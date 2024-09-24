import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const isLoggedIn = !!localStorage.getItem('Auth-token'); // Check if token exists in localStorage
    this.isSellerLoggedIn.next(isLoggedIn);
    return isLoggedIn;
  }

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        if (result.status === 201) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('Auth-token', JSON.stringify(result.body));
          this.router.navigate(['/seller-home']); // Navigate to seller home after signup
        }
      }, (error) => {
        console.error("Error", error);
      this.isLoginError.emit(true);

      });
  }

  reloadSeller() {
    if (localStorage.getItem('Auth-token')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('Auth-token', JSON.stringify(result.body));
        this.router.navigate(['/seller-home']); // Navigate to seller home after login
        }else{
          this.isLoginError.emit(true);
        }

    },(error) => {
      // console.error("Error", error);
      this.isLoginError.emit(true);
    })
  }
  logout() {
    localStorage.removeItem('Auth-token');
    this.isSellerLoggedIn.next(false);
    this.router.navigate(['/sel-auth']); // Navigate to login page after logout
  }
}
