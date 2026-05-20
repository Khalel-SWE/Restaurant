import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {ProductsComponent} from './componants/products/products.component';
import {HeaderComponent} from './componants/header/header.component';
import {CategoryComponent} from './componants/category/category.component';
import {CardDetailsComponent} from './componants/card-details/card-details.component';
import {CardComponent} from './componants/card/card.component';
import {BrowserModule} from '@angular/platform-browser';
import {FooterComponent} from './componants/footer/footer.component';
import { ChefsComponent } from './componants/chefs/chefs.component';
import { ContactInfoComponent } from './componants/contact-info/contact-info.component';
import {APP_BASE_HREF} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './componants/login/login.component';
import { SignupComponent } from './componants/signup/signup.component';
import {AuthInterceptor} from "../interceptors/auth.interceptor";
import {AuthGuard} from "../guard/auth.guard";
import {LoginSignUpGuard} from "../guard/login-sign-up.guard";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { OrderCodeComponent } from './componants/order-code/order-code.component';
import { OrderUserComponent } from './componants/order-user/order-user.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AdminAllOrdersComponent } from './componants/admin-all-orders/admin-all-orders.component';
import { AdminContactMessagesComponent } from './componants/admin-contact-messages/admin-contact-messages.component';
import { MyMessagesComponent } from './componants/my-messages/my-messages.component';
import { AdminUsersComponent } from './componants/admin-users/admin-users.component';


// http://localhost:4200/
  export const routes: Routes = [

    // http://localhost:4200/products
    {path: 'products', component: ProductsComponent, canActivate:[AuthGuard]},
    {path: 'category/:id', component: ProductsComponent, canActivate:[AuthGuard]},
    {path: 'products/:key', component: ProductsComponent, canActivate:[AuthGuard]},
    // http://localhost:4200/profile
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    // http://localhost:4200/cardDetails
    {path: 'cardDetails', component: CardDetailsComponent, canActivate:[AuthGuard]},
    {path: 'contact-info', component: ContactInfoComponent, canActivate:[AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate:[LoginSignUpGuard]},
    {path: 'signup', component: SignupComponent, canActivate:[LoginSignUpGuard]},
    {path: 'chefs', component: ChefsComponent, canActivate:[AuthGuard]},
    {path: 'order-code/:code', component: OrderCodeComponent, canActivate:[AuthGuard]},
    {path: 'orders-user', component: OrderUserComponent, canActivate:[AuthGuard]},
    {path: 'admin-all-orders', component: AdminAllOrdersComponent, canActivate: [AuthGuard]},
    {path: 'admin-contact-messages', component: AdminContactMessagesComponent, canActivate: [AuthGuard]},
    {path: 'my-messages', component: MyMessagesComponent, canActivate:[AuthGuard]},
    {path: 'admin-users', component: AdminUsersComponent, canActivate:[AuthGuard]},
    // http://localhost:4200/
    {path: '', redirectTo: '/products', pathMatch: 'full'},

    // if user enter thing without all routes
    // http://localhost:4200/ghy
    {path: '**', redirectTo: '/products', pathMatch: 'full'},

  ];  



/*
*   // http://localhost:4200/
  {path: '', component:OrderItemsComponent}
* */
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    CategoryComponent,
    CardDetailsComponent,
    CardComponent,
    FooterComponent,
    ChefsComponent,
    ContactInfoComponent,
    LoginComponent,
    SignupComponent,
    OrderCodeComponent,
    OrderUserComponent,
    ProfileComponent,
    AdminAllOrdersComponent,
    AdminContactMessagesComponent,
    MyMessagesComponent,
    AdminUsersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbPaginationModule,
    FormsModule
  ],

  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //   { provide: APP_BASE_HREF, useValue: '/' }],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
