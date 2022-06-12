import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PutUser } from 'src/app/models/put-user';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.usersService.getById(p['id']).subscribe(res => {
        this.user = res;
        if(this.user == null)
          this.router.navigate(['/users']);
      });
    });
  }

  editUser(): void {
    const dto: PutUser = {
      name: this.user.name,
      surname: this.user.surname
    };
    this.usersService.put(this.user.id, dto).subscribe(res => {
        this.router.navigate(['/users']);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
