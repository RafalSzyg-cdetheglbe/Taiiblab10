import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostUser } from 'src/app/models/post-user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  user: PostUser = {
    login: "",
    password: "",
    name: "",
    surname: ""
  };
  userAlreadyExists: boolean = false;

  constructor(private router: Router,
    private usersService: UsersService) { }

  ngOnInit(): void {}

  signUp(): void {
    this.usersService.post(this.user).subscribe(res => {
        if(res != null && res.id > 0) {          
          this.userAlreadyExists = false;
          this.router.navigate(['/login']);
        }
        else
          this.userAlreadyExists = true;
      });
  }

  signIn(): void {
    this.router.navigate(['/login']);
  }
}
