import { Component } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showHideLogin:boolean = true;
  authError:String = "";
  constructor(private user:UserService, private product:ProductService) { }
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
        }else{
          this.localCartToRemoteCart();
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

  // localCartToRemoteCart(){
  //   let data = localStorage.getItem('localCart');
  //   let user = localStorage.getItem('user');
  //   let userId = user && JSON.parse(user).id;

  //   if(data){
  //     let cartDataList:product[] = JSON.parse(data);
  //     if(user){

  //       cartDataList.forEach((product:product,index)=>{
  //           let cartData:cart = {
  //             ...product,
  //             productId:product.id,
  //             userId
  //           }

  //           delete cartData.id;
  //           setTimeout(() => {
  //             this.product.addToCart(cartData).subscribe((result)=>{
  //               if(result){
  //                 console.warn("item stored in database");
  //               }
  //             })

  //             if(cartDataList.length === index+1){
  //               localStorage.removeItem('localCart');
  //             }
  //           }, 500);
  //       })
  //     }
  //   }

  //   this.product.getCartList(userId);

  // }

  //////////////////////replace set timout with poromise///////////

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
  
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      if (user) {
        // Create an array of promises for adding each cart item to the remote cart
        const addToCartPromises = cartDataList.map((product: product) => {
          let cartData: cart = {
            ...product,
            productId: product.id,
            userId
          };
  
          delete cartData.id; // Remove local cart id, as it’s not needed for the remote database
  
          // Return the promise from addToCart so that Promise.all can track it
          return this.product.addToCart(cartData).toPromise();
        });
  
        // Use Promise.all to wait until all cart items are added
        Promise.all(addToCartPromises)
          .then((results) => {
            console.warn("All items stored in the database", results);
            // Clear local storage only if all items are added successfully
            localStorage.removeItem('localCart');
          })
          .catch((error) => {
            console.error("Error adding items to the database", error);
          });
      }
    }
  
    this.product.getCartList(userId);
  }


}
