import { Routes } from "@angular/router";
import { BasketListComponent } from "./components/basket-list/basket-list.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { NewProductFormComponent } from "./components/new-product-form/new-product-form.component";
import { NewUserFormComponent } from "./components/new-user-form/new-user-form.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthorizationGuard } from "./guards/authorization.guard";

export const APP_ROUTES: Routes = [
    {path: 'products', component: ProductsListComponent, canActivate: [AuthorizationGuard]},
    {path: 'products/add', component: NewProductFormComponent, canActivate: [AdminGuard]},
    {path: 'products/:id', component: ProductFormComponent, canActivate: [AdminGuard]},
    {path: 'users', component: UsersListComponent, canActivate: [AdminGuard]},
    {path: 'users/add', component: NewUserFormComponent, canActivate: [AdminGuard]},
    {path: 'users/:id', component: UserFormComponent, canActivate: [AdminGuard]},
    {path: 'basket', component: BasketListComponent, canActivate: [AuthorizationGuard]},
    {path: 'login', component: LoginFormComponent},
    {path: 'register', component: RegisterFormComponent},
    {path: '', redirectTo: 'products', pathMatch: 'full'}
];