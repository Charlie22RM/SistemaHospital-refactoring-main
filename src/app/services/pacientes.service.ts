import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { lastValueFrom } from 'rxjs';
import { Historial } from '../models/historial';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {

  constructor(private http: HttpClient) { }

  public getAll() {
    const url = `${environment.apiUrl}user/pacientes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.get<any>(url, options);
  }

  // eslint-disable-next-line camelcase
  public getHistorial(paciente_id: number) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}user/historial/${paciente_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.get<any>(url, options);
  }

  // eslint-disable-next-line camelcase
  public updateHistorial(historial_id: number, data: Historial) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}historial-clinico/${historial_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return lastValueFrom(this.http.put<any>(url, data, options));
  }

  // eslint-disable-next-line camelcase
  public updateNombreYapellido(paciente_id: number, data: any) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}user/${paciente_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return lastValueFrom(this.http.put<any>(url, data, options));
  }

  // eslint-disable-next-line camelcase
  public deletePaciente(paciente_id: number) {
    // eslint-disable-next-line camelcase
    const url = `${environment.apiUrl}user/${paciente_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    return this.http.delete<any>(url, options);
  }
}
