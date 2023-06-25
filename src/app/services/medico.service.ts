/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { lastValueFrom } from 'rxjs';
import { MedicoDisplay } from '../models/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  public getAllNames() {
    const url = `${environment.apiUrl}consultorios/medicos/nombres`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return lastValueFrom(this.http.get<any>(url, options));
  }

  public getAll() {
    const url = `${environment.apiUrl}medicos`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.get<any>(url, options);
  }

  public createMedico(data: any) {
    const url = `${environment.apiUrl}medicos`;
    data.rol = 2;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.post<any>(url, data, options);
  }

  public getMedicoById(id: number) {
    const url = `${environment.apiUrl}medicos/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.get<any>(url, options);
  }

  public updateMedico(id: number, data: MedicoDisplay) {
    const url = `${environment.apiUrl}medicos/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.put<any>(url, data, options);
  }


  public deleteMedico(id: number) {
    const url = `${environment.apiUrl}medicos/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.delete<any>(url, options);
  }
}
