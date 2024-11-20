import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: String = "default";
  sellerName:string='';
  searchResult:undefined | product[];
  userName:String = '';
  cartItems = 0;
  constructor(private router:Router, private product:ProductService) {}

  ///////////////////////// OLD NGONINIT function ///////////////////////
  // ngOnInit(): void {
  //   this.router.events.subscribe((val: any) => {
  //     if (val instanceof NavigationEnd) {
  //       if (val.url.includes('/seller')) {
  //         this.menuType = 'seller';
  //         if(localStorage.getItem('Auth-token')){
  //           let sellerStore = localStorage.getItem('Auth-token')
  //           let sellerData =  sellerStore && JSON.parse(sellerStore)
  //           this.sellerName =  sellerData[0].name;
  //         }else if(localStorage.getItem('user')){
  //           let userStore = localStorage.getItem('user');
  //           let userData =  userStore && JSON.parse(userStore);
  //           console.log(userData);
  //           this.userName = userData[0].name;
  //           this.menuType = 'user';

  //         }
  //       } else {
  //         this.menuType = 'default';
  //       }
  //     }
  //   });
  // }
  ///////////////////////// NEW NGONINIT function ///////////////////////
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        // Check if the user is on a seller page
        if (val.url.includes('/seller')) {
          this.menuType = 'seller';
          const sellerStore = localStorage.getItem('Auth-token');
          const sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData ? sellerData[0].name : '';
        } else {
          // Check if the user is logged in
          const userStore = localStorage.getItem('user');
          if (userStore) {
            const userData = JSON.parse(userStore);
            this.userName = userData.name || '';
            this.menuType = 'user';
            this.product.getCartList(userData.id);
          } else {
            this.menuType = 'default';
          }
        }
        //console.warn(this.menuType); // Debugging line to check menu type
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })

  }

  logout()
  {
      localStorage.removeItem('Auth-token');
      this.router.navigate(['/']); // Navigate to login page after logout

  }

  userLogout()
  {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']); // Navigate to login page after logout
    this.product.cartData.emit([]);


  }

  searchProduct(query:KeyboardEvent){
      if(query){
        const element = query.target as HTMLInputElement;
        this.product.searchProducts(element.value).subscribe((result)=>{
            // console.log(result);
            this.searchResult = result;
            // this.router.navigate([`search/${result}`]);

        })
      }else{
        this.searchResult = undefined;
      }
  }
  hideSearch(){
    this.searchResult = undefined;
  }

  submitSearch(result: string) {
    if (result.trim()) {
      // Navigate to search page with query parameters
      this.router.navigate(['/search'], { queryParams: { query: result.trim() } });
    }
  }
}
