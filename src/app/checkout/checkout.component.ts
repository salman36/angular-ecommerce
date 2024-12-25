import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:number | undefined;
  cartData:cart[]|undefined;
  orderMessage:string|undefined;
  constructor(private product:ProductService, private router:Router){

  }
  ngOnInit(): void{

    this.product.cartItems().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        const quantity = item.quantity ?? 1
        price += +item.product_price * quantity;
      })
      this.totalPrice = price+(price/10)+100-(price/10);
        
    });

  }

  orderNow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
          
        }, 600);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        // console.log(result);
        if(result){
          this.orderMessage = "Your Order has been placed";
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMessage = undefined;
          }, 4000);
        }
      })

    }

  }
}
