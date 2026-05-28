import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openAddProductModal$ = new Subject<void>();
  openAddProduct$ = this.openAddProductModal$.asObservable();

  openAddProduct() {
    this.openAddProductModal$.next();
  }
}