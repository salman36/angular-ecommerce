import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:String | undefined;
  constructor(private product:ProductService) { }
  ngOnInit(): void{
    
  }

  submitProduct(data: product,from:any) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = "Product Added Successfully";
        from.reset();
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 3000);
    });
  }

}
