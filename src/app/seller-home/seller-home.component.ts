import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList:undefined | product[];
  productMessage:undefined | String;
  trashIcon = faTrash
  editIcon = faEdit
  constructor(private product:ProductService) { }
  ngOnInit():void{
    // this.product.getProduct().subscribe((result)=>{
    //   console.log(result);
    //   this.productList = result
    // })
    this.productListing();
  }

  toggleDescription(index: number): void {
    if (this.productList) {
      this.productList[index].expanded = !this.productList[index].expanded;
    }
  }

  deleteProduct(id:Number)
  {
    this.product.deleteProduct(id).subscribe((result)=>{
          if(result){
            this.productMessage = "Product deleted successfully";~
            this.productListing();
          }
      })
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000);
  }

  productListing(){
    this.product.productList().subscribe((result)=>{
      console.log(result);
      this.productList = result
    })
  }

}
