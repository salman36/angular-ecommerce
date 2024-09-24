import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  reset() {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  addProduct(data:product){
    return this.http.post('http://localhost:3000/products',data);
  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
    }
  deleteProduct(id:Number)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:String)
  {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product:product)
  {
    console.log(product);
    return this.http.put(`http://localhost:3000/products/${product.id}`,product);
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');

  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');

  }

  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?product_name=${query}`);

  }
  
}
