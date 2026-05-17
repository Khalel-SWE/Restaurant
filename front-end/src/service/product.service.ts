import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {map} from "rxjs/operators";
import {Product} from "../model/product";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:9090/products/';
  constructor(private http: HttpClient) {
  }

  getProducts(page: any, size: any): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl + "all-products?page="+ page + "&size=" + size).pipe(
      map(
        response => response
      )
    )
  }

  getProductsByCategoryId(id: any, page: any, size: any): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl + 'all-products/' + id + "?page=" + page + "&size=" + size).pipe(
      map(
        response => response
      )
    )
  }

  search(key: any, page: any, size: any): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl + 'all-products-by-key?key=' + key + "&page=" + page + "&size=" + size).pipe(
      map(
        response => response
      )
    )
  }

  addProduct(product: any): Observable<any> {

  return this.http.post(
    this.baseUrl + "admin/add-product",
    product
  );

}

updateProduct(product: any): Observable<any> {

  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(
    this.baseUrl + "admin/update-product",
    product,
    { headers }
  );

}

deleteProduct(productId: number) {

  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(
  this.baseUrl + `admin/delete-product/${productId}`,
  { headers }
);
}

}
