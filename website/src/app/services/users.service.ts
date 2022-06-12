import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from '../models/paginated-data';
import { Pagination } from '../models/pagination';
import { PostUser } from '../models/post-user';
import { PutUser } from '../models/put-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) { }

  get(pagination?: Pagination): Observable<PaginatedData<User>> {
    return this.httpClient.get<PaginatedData<User>>('http://localhost:1234/Users?' + 
    'SortColumn=' + (pagination?.sortColumn ?? 'Name') +
    '&Page=' + (pagination?.page ?? 1) +
    '&RowsPerPage=' + (pagination?.rowsPerPage ?? 10) + 
    '&SortAscending=' + (pagination?.sortAscending ?? true));
  }

  getById(userId: number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:1234/Users/' + userId);
  }

  post(dto: PostUser): Observable<User> {
    return this.httpClient.post<User>('http://localhost:1234/Users', dto)
  }

  put(userId: number, dto: PutUser): Observable<User> {
    return this.httpClient.put<User>('http://localhost:1234/Users/' + userId, dto);
  }

  delete(userId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('http://localhost:1234/Users/' + userId);
  }
}
