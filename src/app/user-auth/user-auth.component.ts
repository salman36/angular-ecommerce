import { Component } from '@angular/core';
import { login, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showHideLogin:boolean = true;
  authError:String = "";
  constructor(private user:UserService) { }
  ngOnInit(): void{
    this.user.userAuthReload();
  }

  signUp(data:signUp){
    // console.log("User Sign Up Button Clicked");
    this.user.userSingUP(data);
  }

  loginUser(data:login){
    // console.log("User Login Button Clicked");
    this.user.loginUser(data);
    this.user.invalidUserAuth.subscribe((result)=>{
        if(result){
          this.authError = "Invalid User Credentials";
        }
    })
  }

  openSingUp()
  {
    this.showHideLogin = false;
  }
  openLogin()
  {
    this.showHideLogin = true;
  }


}
