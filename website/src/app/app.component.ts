import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Taiib - lab';
  constructor(private jwtHelper: JwtHelperService) {}

  isAdmin():boolean {
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token))
      if(jwtDecode(localStorage.getItem("jwt"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'admin')
        return true;
    return false;
  }

  isUserAuthenticated(): boolean {
    const token: string = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper)
      return true;
    return false;
  }

  logout() {
    localStorage.removeItem("jwt");
  }
}
