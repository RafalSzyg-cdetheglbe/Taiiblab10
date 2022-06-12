import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate() {
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)) {
      if(jwtDecode(localStorage.getItem("jwt"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'admin')
        return true;
      this.router.navigate(["products"]);
      return false;
    }
    this.router.navigate(["login"]);
    return false;
  }
  
}
