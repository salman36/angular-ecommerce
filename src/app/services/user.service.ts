import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router: Router) { }

  userSingUP(user:signUp){
    // console.log(user);
    return this.http.post('http://localhost:3000/user',user,{observe:'response'}).
    subscribe((result)=>{
      // console.log(result);
      localStorage.setItem('user',JSON.stringify(result.body));
      this.router.navigate(['/']);
    });
  }


  loginUser(data:login)
  {
    return this.http.get<signUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body && result.body.length > 0){
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.invalidUserAuth.emit(false);
        this.router.navigate(['/']);
      }else{
        // alert('Invalid Email or Password');
        this.invalidUserAuth.emit(true);
      }
    });  
  }

  userAuthReload()
  {
    if(localStorage.getItem('user'))
    {
      this.router.navigate(['/']);
    }
  }
}
