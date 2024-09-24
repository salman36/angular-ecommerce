import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp,login } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false;
  authError:String = '';
  ngOnInit(): void {
    this.seller.reloadSeller(); // Ensure the reloadSeller method is called on component initialization
  }

  signUp(data: signUp): void {
    this.seller.userSignUp(data);
  }

  openLogin()
  {
    this.showLogin = true;
  }

  openSignUp()
  {
    this.showLogin = false;
  }

  login(data:login): void
  {
    // console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      console.warn(isError);
      if(isError){
        this.authError = 'Invalid Credentials';
        setTimeout(() => {
          this.authError = '';
        }, 2000);
      }
    })
  }
}
