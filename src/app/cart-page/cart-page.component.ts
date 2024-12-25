import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService, private router:Router) {}

  ngOnInit(): void {
    /////////////////// hide this and make common function for thid functionality //////////
    // this.product.cartItems().subscribe((result) => {
    //   this.cartData = result;
    //   let price = 0;
    //   result.forEach((item) => {
    //     const quantity = item.quantity ?? 1
    //     price += +item.product_price * quantity;
    //   });
    //     this.priceSummary.price = price;
    //     this.priceSummary.discount = price/10;
    //     this.priceSummary.tax = price/10;
    //     this.priceSummary.delivery = 100;
    //     this.priceSummary.total =
    //     this.priceSummary.price -
    //     this.priceSummary.discount +
    //     this.priceSummary.tax +
    //     this.priceSummary.delivery;
    // });
    this.loadCartDetails();
  }

  loadCartDetails()
  {
    this.product.cartItems().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        const quantity = item.quantity ?? 1
        price += +item.product_price * quantity;
      });
        this.priceSummary.price = price;
        this.priceSummary.discount = price/10;
        this.priceSummary.tax = price/10;
        this.priceSummary.delivery = 100;
        this.priceSummary.total =
        this.priceSummary.price -
        this.priceSummary.discount +
        this.priceSummary.tax +
        this.priceSummary.delivery;
        /////// if cart have no items then redirect the home page ///////////
        if(!this.cartData.length){
         this.router.navigate(['/']);
        }
    });
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId:number | undefined)
  {
    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result)=>{
        if(result){
          this.loadCartDetails();
        }
      })
    
  }
}
