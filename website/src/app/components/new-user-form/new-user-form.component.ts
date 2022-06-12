import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostUser } from 'src/app/models/post-user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {
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

  createUser(): void {
    this.usersService.post(this.user).subscribe(res => {
        if(res != null && res.id > 0) {
          this.userAlreadyExists = false;
          this.router.navigate(['/users']);
        }
        else this.userAlreadyExists = true;
      });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
