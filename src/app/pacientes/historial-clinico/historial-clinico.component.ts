import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ValueService } from 'src/app/services/value.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { HistorialDisplay } from 'src/app/models/userHistorial';
import { CitaService } from 'src/app/services/cita.service';
import { CitaDisplay } from 'src/app/models/cita';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.css'],
})
export class HistorialClinicoComponent implements OnInit {
  enfermedades!: FormGroup;
  // eslint-disable-next-line camelcase
  private paciente_id = 0;
  historial!: HistorialDisplay;
  data!: CitaDisplay[];
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private valueService: ValueService,
    private pacienteService: PacientesService,
    private citaService: CitaService,
  ) {
    this.enfermedades = this._formBuilder.group({
      nombre: [null],
      apellido: [null],
      edad: [null],
      altura: [null],
      peso: [null],
      masaCorporal: [null],
      temperatura: [null],
      frecuenciaRespiratoria: [null],
      presionArterial: [null],
      frecuenciaCardiaca: [null],
      diabetes: [false],
      diabetesDescripcion: [null],
      tiroideas: [false],
      tiroideasDescripcion: [null],
      hipertension: [false],
      hipertensionDescripcion: [null],
      cardiopatia: [false],
      cardiopatiaDescripcion: [null],
      traumatismo: [false],
      traumatismoDescripcion: [null],
      cancer: [false],
      cancerDescripcion: [null],
      otros: [false],
      otrosDescripcion: [null],
      especialidad: [null],
      fecha: [null],
      hora: [null],
    });
  }

  async ngOnInit(): Promise<void> {
    console.log('aqui estoy');
    // eslint-disable-next-line camelcase
    console.log(this.paciente_id);
    const promise1 = this.getDataPaciente();
    const promise2 = this.getLastCita();
    await Promise.all([promise1, promise2]);

    // Aquí puedes realizar alguna acción con los resultados de las promesas
    console.log('Datos del paciente:', promise1);
    console.log('Última cita:', promise2);
  }

  getDataPaciente() {
    this.pacienteService.getHistorial(this.paciente_id).subscribe({
      next: async (res) => {
        console.log(res);
        this.historial = res;
        this.enfermedades.patchValue({
          nombre: this.historial.nombre,
          apellido: this.historial.apellido,
          edad: this.historial.historialClinico?.edad,
          altura: this.historial.historialClinico?.altura,
          peso: this.historial.historialClinico?.peso,
          masaCorporal: this.historial.historialClinico?.masaCorporal,
          temperatura: this.historial.historialClinico?.temperatura,
          frecuenciaRespiratoria: this.historial.historialClinico?.frecuenciaRespiratoria,
          presionArterial: this.historial.historialClinico?.presionArterial,
          frecuenciaCardiaca: this.historial.historialClinico?.frecuenciaCardiaca,
          diabetes: this.historial.historialClinico?.diabetes,
          diabetesDescripcion: this.historial.historialClinico?.diabetesDescripcion,
          tiroideas: this.historial.historialClinico?.tiroideas,
          tiroideasDescripcion: this.historial.historialClinico?.tiroideasDescripcion,
          hipertension: this.historial.historialClinico?.hipertension,
          hipertensionDescripcion: this.historial.historialClinico?.hipertensionDescripcion,
          cardiopatia: this.historial.historialClinico?.cardiopatia,
          cardiopatiaDescripcion: this.historial.historialClinico?.cardiopatiaDescripcion,
          traumatismo: this.historial.historialClinico?.traumatismo,
          traumatismoDescripcion: this.historial.historialClinico?.traumatismoDescripcion,
          cancer: this.historial.historialClinico?.cancer,
          cancerDescripcion: this.historial.historialClinico?.cancerDescripcion,
          otros: this.historial.historialClinico?.otros,
          otrosDescripcion: this.historial.historialClinico?.otrosDescripcion,
        });
      },
    }),
    this.enfermedades.get('diabetes')?.disable();
    this.enfermedades.get('tiroideas')?.disable();
    this.enfermedades.get('hipertension')?.disable();
    this.enfermedades.get('cardiopatia')?.disable();
    this.enfermedades.get('traumatismo')?.disable();
    this.enfermedades.get('cancer')?.disable();
    this.enfermedades.get('otros')?.disable();
  }

  getLastCita() {
    this.citaService.getLastById(this.paciente_id).subscribe({
      next: async (res) => {
        this.data = res;
        this.enfermedades.get('fecha')?.setValue(res[0].fecha);
        this.enfermedades.get('hora')?.setValue(res[0].hora);
        this.enfermedades.get('especialidad')?.setValue(res[0].consultorios[0].especialidad);
      },
    });
  }

}
