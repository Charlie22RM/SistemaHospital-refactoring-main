import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CitaService {

  constructor(private http: HttpClient) { }

  // eslint-disable-next-line camelcase
  public getAllById(user_id: number) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}cita/${user_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.get<any>(url, options);
  }

  // eslint-disable-next-line camelcase
  public getLastById(user_id: number) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}cita/last/${user_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.get<any>(url, options);
  }


  public createCita(data: any) {
    const url = `${environment.apiUrl}cita`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.post<any>(url, data, options);
  }
}
