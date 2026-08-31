import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:9090/products/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getProducts(page: any, size: any): Observable<any> {
    return this.http.get(this.baseUrl + `all-products?page=${page}&size=${size}`);
  }

  getProductsByCategoryId(id: any, page: any, size: any): Observable<any> {
    return this.http.get(this.baseUrl + `all-products/${id}?page=${page}&size=${size}`);
  }

  search(key: any, page: any, size: any): Observable<any> {
    return this.http.get(this.baseUrl + `all-products-by-key?key=${key}&page=${page}&size=${size}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(
      this.baseUrl + 'admin/add-product',
      product,
      { headers: this.getAuthHeaders() }
    );
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(
      this.baseUrl + 'admin/update-product',
      product,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(
      this.baseUrl + `admin/delete-product/${productId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
