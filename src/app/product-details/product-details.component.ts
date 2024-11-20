import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData:undefined | product;
  productQuantity:number = 1;
  removeCart = false;
  cartData:product | undefined;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void{
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      // console.log(result);
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId == item.id.toString())
        if(items.length > 0){ 
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString() === item.productId?.toString())
          if(item.length){
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }


    })

  }

  handleQuantity(val:string){
      if(this.productQuantity < 20 && val === 'inc'){
        // this.productQuantity = this.productQuantity+1; /// both are same working
        this.productQuantity+=1;
    }
    else if(this.productQuantity > 1 && val === 'dec'){
      this.productQuantity-=1;
    }
  }

  AddToCart(){
    // console.warn("hi");
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      // console.log(this.productData);
       if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
       }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:cart ={
            ...this.productData,
            userId,
            productId:this.productData.id,
        }
        delete cartData.id;
        // console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              this.product.getCartList(userId);
              this.removeCart = true;
            }
        })

       }
    }
  }

  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId);
    }else{
      // console.warn(this.cartData);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result){
            this.product.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
    
  }

}
