import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  
  constructor(private router: Router,
    private usersService: UsersService) { 
    this.update();
  }

  ngOnInit(): void {
  }

  update(event?: any): void {
    const pagination: Pagination = {
      page: 1,
      rowsPerPage: 10,
      sortAscending: true,
      sortColumn: "name"
    };

    if(event) {
      pagination.page = event.pageIndex + 1;
      pagination.rowsPerPage = event.pageSize
    }

    this.usersService.get(pagination).subscribe(res => {
      this.users = res.data;
      this.length = res.count;
    });
  }

  editUser(userId: number): void {
    this.router.navigate(['users/' + userId]);
  }

  deleteUser(userId: number): void {
    this.usersService.delete(userId).subscribe(res => {
      if (res) this.update();
    });
  }

  addNewUser(): void {
    this.router.navigate(['users/add']);
  }
}
