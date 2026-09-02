import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from "../../../model/product";
import { ProductService } from "../../../service/product.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../../../service/cart.service";
import { ProductOrder } from "../../../model/product-order";
import { AuthService } from "../../../service/auth.service";
import { ModalService } from "../../../service/modal.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  messageAr: string = '';
  messageEn: string = '';
  products: Product[] = [];
  isEditMode: boolean = false;
  selectedProduct: any = null;
  imageOptions: string[] = [];
  pageNumber: number = 1;
  pageSize: number = 20;
  totalProductSize: number = 0;
  newProduct: any = {};

  private modalInstance: any = null;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.resetProductForm();

    this.activatedRoute.paramMap.subscribe(
      () => this.loadProducts(this.pageNumber)
    );

    this.modalInstance = this.modalService.openAddProduct$.subscribe(() => {
      this.initAddProductAndOpen();
    });
  }

  ngOnDestroy(): void {
    if (this.modalInstance) {
      this.modalInstance.unsubscribe();
    }
  }

  getEmptyProduct() {
    return {
      id: null,
      name: '',
      imagePath: '',
      description: '',
      price: 0,
      category: { id: 3 }
    };
  }

  resetProductForm() {
    this.newProduct = this.getEmptyProduct();
    this.updateImageOptions();
  }

  initAddProductAndOpen() {
    this.isEditMode = false;
    this.resetProductForm();
    this.showModal();
  }

  editProduct(product: any) {
    this.isEditMode = true;
    this.newProduct = {
      id: product.id,
      name: product.name,
      imagePath: product.imagePath,
      description: product.description,
      price: product.price,
      category: { id: product.category?.id || 3 }
    };
    
    this.updateImageOptions();
    
    this.showModal();
  }

  showModal() {
    setTimeout(() => {
      const modalEl = document.getElementById('addProductModal');
      if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        modalEl.removeAttribute('aria-hidden');
        document.body.classList.add('modal-open');

        if (!document.getElementById('customBackdrop')) {
          const backdrop = document.createElement('div');
          backdrop.className = 'modal-backdrop fade show';
          backdrop.id = 'customBackdrop';
          document.body.appendChild(backdrop);
        }
      }
    }, 0);
  }

  closeProductModal() {
    const modalEl = document.getElementById('addProductModal');
    if (modalEl) {
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');

      const backdrop = document.getElementById('customBackdrop');
      if (backdrop) backdrop.remove();
    }
  }

  saveProduct() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.newProduct).subscribe({
        next: () => {
          this.loadProducts(this.pageNumber);
          this.closeProductModal();
          this.resetProductForm();
        },
        error: (error) => {
          console.log(error);
          alert("Error While Updating Product");
        }
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.loadProducts(this.pageNumber);
          this.closeProductModal();
          this.resetProductForm();
        },
        error: (error) => {
          console.log(error);
          alert("Error While Adding Product");
        }
      });
    }
  }

  updateImageOptions() {
    const categoryId = Number(this.newProduct?.category?.id || 3);
    
    if ([1, 2, 3, 4].includes(categoryId)) { 
      this.imageOptions = ['foods/beefburger.jpg','foods/chickenburger.jpg','foods/chickencrepe.jpg','foods/chickenpizza.jpg','foods/chickenshawarma.jpg','foods/diffrentgreens.jpg','foods/dissolvedkebab.jpg','foods/glee.jpg','foods/grilledchicken.jpg','foods/kofta.jpg','foods/koftacrepe.jpg','foods/lambfeathers.jpg','foods/liver.jpg','foods/meatshawarma.jpg','foods/mixcheesepizza.jpg','foods/mombar.jpg','foods/okrawithmeat.jpg','foods/potatoeswithmeat.jpg','foods/rice.jpg','foods/ricewithmeat.jpg','foods/sausage.jpg'];
    } 
    else if (categoryId === 5) { 
      this.imageOptions = ['cold-drinks/applejuice.jpg','cold-drinks/cocktail.jpg','cold-drinks/kiwijuice.jpg','cold-drinks/lemonjuice.jpg','cold-drinks/mangojuice.jpg','cold-drinks/mirnda.jpg','cold-drinks/orangejuice.jpg','cold-drinks/pepsi.jpg','cold-drinks/rani.jpg','cold-drinks/schweppes.jpg','cold-drinks/strawberryicecream.jpg','cold-drinks/strawberryjuice.jpg'];
    } 
    else if (categoryId === 6) { 
      this.imageOptions = ['hot-drinks/blackcoffee.jpg','hot-drinks/cinnamontea.jpg','hot-drinks/coffeewithhazelnuts.jpg','hot-drinks/forget.jpg','hot-drinks/frenchcoffee.jpg','hot-drinks/greentea.jpg','hot-drinks/hotchocolate.jpg','hot-drinks/milkcinnamon.jpg','hot-drinks/mint.jpg','hot-drinks/nescafeblack.jpg','hot-drinks/nescafemilk.jpg','hot-drinks/pepperminttea.jpg','hot-drinks/plainsahlab.jpg','hot-drinks/sahlabwithnuts.jpg','hot-drinks/tea.jpg','hot-drinks/teawithmilk.jpg','hot-drinks/turkishcoffee.jpg'];
    } 
    else { 
      this.imageOptions = ['sweets/basbousa.jpg','sweets/blueberrycheesecake.jpg','sweets/chocolatecheesecake.jpg','sweets/chocolatecupcake.jpg','sweets/chocolateicecream.jpg'];
    }
    
    const imageExists = this.imageOptions.includes(this.newProduct.imagePath);
    if (!imageExists && this.imageOptions.length > 0) {
      this.newProduct.imagePath = this.imageOptions[0];
    }
  }

  isAdmin(): boolean { return this.authService.isAdmin(); }

  loadProducts(pageNum: number) {
    const hasCategoryId = this.activatedRoute.snapshot.paramMap.has("id");
    const hasKey = this.activatedRoute.snapshot.paramMap.has("key");
    if (hasCategoryId) {
      this.getProductByCategoryId(this.activatedRoute.snapshot.paramMap.get("id"), pageNum);
    } else if (hasKey) {
      this.searchByKey(this.activatedRoute.snapshot.paramMap.get("key"), pageNum);
    } else {
      this.getProducts(pageNum);
    }
  }

  getProducts(pageNum: number) {
    this.productService.getProducts(pageNum, this.pageSize).subscribe({
      next: response => { this.products = response.products; this.totalProductSize = response.totalProducts; },
      error: () => { this.products = []; }
    });
  }

  getProductByCategoryId(id: any, pageNum: number) {
    this.productService.getProductsByCategoryId(id, pageNum, this.pageSize).subscribe({
      next: response => { this.products = response.products; this.totalProductSize = response.totalProducts; },
      error: () => { this.products = []; }
    });
  }

  searchByKey(key: any, pageNum: any) {
    this.productService.search(key, pageNum, this.pageSize).subscribe({
      next: response => { this.products = response.products; this.totalProductSize = response.totalProducts; },
      error: () => { this.products = []; }
    });
  }

  pagination() { this.loadProducts(this.pageNumber); }

  changePageSize(event: Event) {
    this.pageSize = +(<HTMLInputElement>event.target).value;
    this.loadProducts(this.pageNumber);
  }

  addProduct(product: Product) {
    this.cartService.addProductToOrder(new ProductOrder(product));
  }

  showDetails(product: any) { this.selectedProduct = product; }

  deleteProduct(productId: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(productId).subscribe({
      next: () => { this.products = this.products.filter((p: any) => p.id !== productId); },
      error: () => { alert('Failed to delete product'); }
    });
  }
}