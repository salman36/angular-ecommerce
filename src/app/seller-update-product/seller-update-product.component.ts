import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData:undefined | product
  productMessage:undefined | String;
  constructor(private route : ActivatedRoute, private product:ProductService,private router:Router) { }

  ngOnInit(): void{
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData = data;
    })
  }

  submitProduct(data:product)
  {
    if(this.productData)
    {
      data.id = this.productData.id;
    }
    // console.warn("update product button clicked",data);
    this.product.updateProduct(data).subscribe((result)=>{
          if(result){
            this.productMessage = "Product updated successfully";
          }
      });
      setTimeout(() => {
        this.productMessage = undefined;
        // redirect to the product listing page
         this.router.navigate(['seller-home']);
      }, 2000);
  }
}
