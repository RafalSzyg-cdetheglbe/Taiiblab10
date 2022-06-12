import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Authorization } from 'src/app/models/authorization';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  invalidLogin: boolean = false;
  login: string = "";
  password: string = "";

  signIn(form: NgForm): void {
    const dto: Authorization = {
      login: this.login,
      password: this.password
    };
    this.authorizationService.login(dto).subscribe(response =>{
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

  signUp(): void {
    this.router.navigate(["/register"]);
  }
  
  ngOnInit(): void {}
}
