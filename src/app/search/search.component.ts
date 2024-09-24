import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchResult: undefined | product[];
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        // Call the search API based on the query parameter
        this.product.searchProducts(query).subscribe(result => {
          this.searchResult = result;
        });
      }
    });
    
  }

  isValidNumber(value: any): boolean {
    return !isNaN(value) && value !== null && value !== ''; // Additional check for empty string
  }
}
