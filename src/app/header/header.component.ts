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
  constructor(private router:Router, private product:ProductService) {}
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('/seller')) {
          this.menuType = 'seller';
          if(localStorage.getItem('Auth-token')){
            let sellerStore = localStorage.getItem('Auth-token')
            let sellerData =  sellerStore && JSON.parse(sellerStore)
            this.sellerName =  sellerData[0].name;
          }
        } else {
          this.menuType = 'default';
        }
        console.warn(this.menuType); // Debugging line to check menu type
      }
    });
  }

  logout()
  {
      localStorage.removeItem('Auth-token');
      this.router.navigate(['/']); // Navigate to login page after logout

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
