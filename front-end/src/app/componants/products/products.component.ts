import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../service/cart.service";
import {ProductOrder} from "../../../model/product-order";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent  implements OnInit{

  messageAr: string = '';
  messageEn: string = '';
  products: Product[] = [];
  isEditMode: boolean = false;
  newProduct: any = {
  name: '',
  imagePath: '',
  description: '',
  price: 0,
  category: {
    id: 1
  }
};
selectedProduct: any = null;

openAddProductModal() {

  this.isEditMode = false;

  this.newProduct = {
    name: '',
    imagePath: '',
    description: '',
    price: 0,
    category: {
      id: 1
    }
  };

}

imageOptions: string[] = [];

updateImageOptions() {

  const categoryId = this.newProduct.category.id;

  // FOODS
  if (categoryId == 1) {

    this.imageOptions = [

      'foods/beefburger.jpg',
      'foods/chickenburger.jpg',
      'foods/chickencrepe.jpg',
      'foods/chickenpizza.jpg',
      'foods/chickenshawarma.jpg',
      'foods/diffrentgreens.jpg',
      'foods/dissolvedkebab.jpg',
      'foods/glee.jpg',
      'foods/grilledchicken.jpg',
      'foods/kofta.jpg',
      'foods/koftacrepe.jpg',
      'foods/lambfeathers.jpg',
      'foods/liver.jpg',
      'foods/meatshawarma.jpg',
      'foods/mixcheesepizza.jpg',
      'foods/mombar.jpg',
      'foods/okrawithmeat.jpg',
      'foods/potatoeswithmeat.jpg',
      'foods/rice.jpg',
      'foods/ricewithmeat.jpg',
      'foods/sausage.jpg'

    ];
  }

  // COLD DRINKS
  else if (categoryId == 2) {

    this.imageOptions = [

      'cold-drinks/applejuice.jpg',
      'cold-drinks/cocktail.jpg',
      'cold-drinks/kiwijuice.jpg',
      'cold-drinks/lemonjuice.jpg',
      'cold-drinks/mangojuice.jpg',
      'cold-drinks/mirnda.jpg',
      'cold-drinks/orangejuice.jpg',
      'cold-drinks/pepsi.jpg',
      'cold-drinks/rani.jpg',
      'cold-drinks/schweppes.jpg',
      'cold-drinks/strawberryicecream.jpg',
      'cold-drinks/strawberryjuice.jpg'

    ];
  }

  // HOT DRINKS
  else if (categoryId == 3) {

    this.imageOptions = [

      'hot-drinks/blackcoffee.jpg',
      'hot-drinks/cinnamontea.jpg',
      'hot-drinks/coffeewithhazelnuts.jpg',
      'hot-drinks/forget.jpg',
      'hot-drinks/frenchcoffee.jpg',
      'hot-drinks/greentea.jpg',
      'hot-drinks/hotchocolate.jpg',
      'hot-drinks/milkcinnamon.jpg',
      'hot-drinks/mint.jpg',
      'hot-drinks/nescafeblack.jpg',
      'hot-drinks/nescafemilk.jpg',
      'hot-drinks/pepperminttea.jpg',
      'hot-drinks/plainsahlab.jpg',
      'hot-drinks/sahlabwithnuts.jpg',
      'hot-drinks/tea.jpg',
      'hot-drinks/teawithmilk.jpg',
      'hot-drinks/turkishcoffee.jpg'

    ];
  }

  // SWEETS
  else if (categoryId == 4) {

    this.imageOptions = [

      'sweets/basbousa.jpg',
      'sweets/blueberrycheesecake.jpg',
      'sweets/chocolatecheesecake.jpg',
      'sweets/chocolatecupcake.jpg',
      'sweets/chocolateicecream.jpg',
      'sweets/chocolatemilkshake.jpg',
      'sweets/knafehdates.jpg',
      'sweets/knafehmanga.jpg',
      'sweets/knafehnablusia.jpg',
      'sweets/knafehwithcream.jpg',
      'sweets/lotuscheesecake.jpg',
      'sweets/mangoicecream.jpg',
      'sweets/mixedsweets.jpg',
      'sweets/mixicecream.jpg',
      'sweets/pancake.jpg',
      'sweets/plainbasboush.jpg',
      'sweets/ricewithmilk.jpg',
      'sweets/strawberrycheesecake.jpg',
      'sweets/strawberryicecream.jpg',
      'sweets/strawberryjuicewithmilk.jpg',
      'sweets/strawberrymilkshake.jpg',
      'sweets/sweetcrepe.jpg',
      'sweets/vanillacupcake.jpg',
      'sweets/vanillaicecream.jpg',
      'sweets/vanillamilkshake.jpg'

    ];
  }

  this.newProduct.imagePath = this.imageOptions[0];

}


  pageNumber: number = 1;
  pageSize: number = 20;
  totalProductSize: number = 0;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
              private cartService: CartService, private authService: AuthService) {

  }
  saveProduct() {

  if (this.newProduct.id) {

    this.productService.updateProduct(this.newProduct).subscribe({

      next: (response) => {

        console.log("PRODUCT UPDATED", response);

        alert("Product Updated Successfully 🔥");

        this.loadProducts(this.pageNumber);

        this.isEditMode = false;

      },

      error: (error) => {

        console.log(error);

        alert("Error While Updating Product");

      }

    });

  } else {

    this.productService.addProduct(this.newProduct).subscribe({

      next: (response) => {

        console.log("PRODUCT ADDED", response);

        alert("Product Added Successfully 🔥");

        this.loadProducts(this.pageNumber);

        const modal = document.getElementById('addProductModal');

if (modal) {

  const bootstrapModal =
    (window as any).bootstrap.Modal.getInstance(modal);

  bootstrapModal.hide();
}

      },

      error: (error) => {

        console.log(error);

        alert("Error While Adding Product");

      }

    });

  }

}


editProduct(product: any) {

  this.isEditMode = true;

  this.newProduct = {
    id: product.id,
    name: product.name,
    imagePath: product.imagePath,
    description: product.description,
    price: product.price,
    category: {
      id: product.category.id
    }
  };

}

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.updateImageOptions();
    this.activatedRoute.paramMap.subscribe(
      () => this.loadProducts(this.pageNumber)
    )
  }

  // http://localhost:4200/products
  // http://localhost:4200/category/1
  // http://localhost:4200/search/rice
  loadProducts(pageNum : number){
      // check
      let hasCategoryId = this.activatedRoute.snapshot.paramMap.has("id");
      let hasKey = this.activatedRoute.snapshot.paramMap.has("key");
      if (hasCategoryId){
        let categoryId = this.activatedRoute.snapshot.paramMap.get("id");
        this.getProductByCategoryId(categoryId, pageNum);
        return;
      } else if (hasKey) {
        let key = this.activatedRoute.snapshot.paramMap.get("key");
        this.searchByKey(key, pageNum);
        return;
      }

      this.getProducts(pageNum);
  }


  getProducts(pageNum : number){
    this.productService.getProducts(pageNum, this.pageSize).subscribe(
      response => {
        this.products = response.products;
        this.totalProductSize = response.totalProducts
      }, error => {
        this.messageAr = error.error.bundleMessage.message_ar;
        this.messageEn = error.error.bundleMessage.message_en;
        this.products = [];
      }
    )
  }

  getProductByCategoryId(id: any, pageNum: number){
    this.productService.getProductsByCategoryId(id, pageNum, this.pageSize).subscribe(
      response => {
        this.products = response.products;
        this.totalProductSize = response.totalProducts
      }, error => {
        this.messageAr = error.error.bundleMessage.message_ar;
        this.messageEn = error.error.bundleMessage.message_en;
        this.products = [];
      }
    )
  }

  searchByKey(key: any, pageNum: Number){
    this.productService.search(key, pageNum, this.pageSize).subscribe(
      response => {
        this.products = response.products;
        this.totalProductSize = response.totalProducts
      }, error => {
        this.messageAr = error.error.bundleMessage.message_ar;
        this.messageEn = error.error.bundleMessage.message_en;
        this.products = [];
      }
    )
  }

  pagination() {
   this.loadProducts(this.pageNumber)
  }

  changePageSize(event: Event) {
    this.pageSize = +(<HTMLInputElement>event.target).value
    this.loadProducts(this.pageNumber)
  }

  addProduct(product: Product){
    let productOrder = new ProductOrder(product);
    this.cartService.addProductToOrder(productOrder);

  }

  showDetails(product: any) {

  this.selectedProduct = product;

}

  deleteProduct(productId: number) {

  const confirmDelete = confirm('Are you sure you want to delete this product?');

  if (!confirmDelete) {
    return;
  }

  this.productService.deleteProduct(productId).subscribe({

    next: () => {

      this.products = this.products.filter(
        (product: any) => product.id !== productId
      );

      alert('Product deleted successfully');
    },

    error: (err) => {
      console.log(err);
      alert('Failed to delete product');
    }

  });
}
}
