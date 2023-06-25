/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { lastValueFrom } from 'rxjs';
import { Consultorio } from '../models/consultorio';

@Injectable({
  providedIn: 'root',
})
export class ConsultorioService {
  constructor(private http: HttpClient) { }

  public getAll() {
    const url = `${environment.apiUrl}consultorios`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.get<any>(url, options);
  }

  public getConsultorios() {
    const url = `${environment.apiUrl}consultorios`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return lastValueFrom(this.http.get<any>(url, options));
  }


  // eslint-disable-next-line camelcase
  public getOneById(consultorio_id: number): Promise<Consultorio> {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}consultorios/${consultorio_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return lastValueFrom(this.http.get<any>(url, options));
  }

  // eslint-disable-next-line camelcase
  public editConsultorio(consultorio_id: number, data: any) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}consultorios/${consultorio_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.put<any>(url, data, options);
  }

  public createConsultorio(data: any) {
    const url = `${environment.apiUrl}consultorios`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.post<any>(url, data, options);
  }

  // eslint-disable-next-line camelcase
  public deleteConsultorio(consultorio_id: number) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}consultorios/${consultorio_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.delete<any>(url, options);
  }
}
