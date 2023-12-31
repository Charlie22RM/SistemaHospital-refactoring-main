/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { UserCreation } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public login(paramsData: any): Observable<any> {
    const url = `${environment.apiUrl}auth/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.post<any>(url, paramsData, options);
  }

  register(user: UserCreation) {
    const url = `${environment.apiUrl}auth/register`;
    user.rol = 1;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.post<any>(url, user, options);
  }
}
