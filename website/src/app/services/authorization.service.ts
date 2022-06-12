import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authorization } from '../models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private httpClient: HttpClient) { }

  login(dto: Authorization): Observable<any> {
    return this.httpClient.post("http://localhost:1234/Authorization", dto, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
