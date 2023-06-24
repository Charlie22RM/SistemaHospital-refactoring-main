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
export class HistorialClinicoComponent implements OnInit{
  enfermedades!: FormGroup;
  private paciente_id: number = 0;
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
      masa_corporal: [null],
      temperatura: [null],
      frecuencia_respiratoria: [null],
      presion_arterial: [null],
      frecuencia_cardiaca: [null],
      diabetes: [false],
      diabetes_descripcion: [null],
      tiroideas: [false],
      tiroideas_descripcion: [null],
      hipertension: [false],
      hipertension_descripcion: [null],
      cardiopatia: [false],
      cardiopatia_descripcion: [null],
      traumatismo: [false],
      traumatismo_descripcion: [null],
      cancer: [false],
      cancer_descripcion: [null],
      otros: [false],
      otros_descripcion: [null],
      especialidad: [null],
      fecha: [null],
      hora: [null],
    });
  }
  
  ngOnInit(): void {
    console.log("aqui estoy");
    this.paciente_id = this.valueService.id;
    console.log(this.paciente_id);
    let promise1 = this.getDataPaciente();
    let promise2 = this.getLastCita();
    Promise.all([promise1,promise2]);
  }

  getDataPaciente() {
    this.pacienteService.getHistorial(this.paciente_id).subscribe({
      next: async (res) => {
        console.log(res);
        this.historial=res;
        this.enfermedades.patchValue({
          nombre: this.historial.nombre,
          apellido: this.historial.apellido,
          edad: this.historial.historialClinico?.edad,
          altura: this.historial.historialClinico?.altura,
          peso: this.historial.historialClinico?.peso,
          masa_corporal: this.historial.historialClinico?.masaCorporal,
          temperatura: this.historial.historialClinico?.temperatura,
          frecuencia_respiratoria: this.historial.historialClinico?.frecuenciaRespiratoria,
          presion_arterial: this.historial.historialClinico?.presionArterial,
          frecuencia_cardiaca: this.historial.historialClinico?.frecuenciaCardiaca,
          diabetes: this.historial.historialClinico?.diabetes,
          diabetes_descripcion: this.historial.historialClinico?.diabetesDescripcion,
          tiroideas: this.historial.historialClinico?.tiroideas,
          tiroideas_descripcion: this.historial.historialClinico?.tiroideasDescripcion,
          hipertension: this.historial.historialClinico?.hipertension,
          hipertension_descripcion: this.historial.historialClinico?.hipertensionDescripcion,
          cardiopatia: this.historial.historialClinico?.cardiopatia,
          cardiopatia_descripcion: this.historial.historialClinico?.cardiopatiaDescripcion,
          traumatismo: this.historial.historialClinico?.traumatismo,
          traumatismo_descripcion: this.historial.historialClinico?.traumatismoDescripcion,
          cancer: this.historial.historialClinico?.cancer,
          cancer_descripcion: this.historial.historialClinico?.cancerDescripcion,
          otros: this.historial.historialClinico?.otros,
          otros_descripcion: this.historial.historialClinico?.otrosDescripcion,
        });
      },
    })
    this.enfermedades.get('diabetes')!.disable();
    this.enfermedades.get('tiroideas')!.disable();
    this.enfermedades.get('hipertension')!.disable();
    this.enfermedades.get('cardiopatia')!.disable();
    this.enfermedades.get('traumatismo')!.disable();
    this.enfermedades.get('cancer')!.disable();
    this.enfermedades.get('otros')!.disable();
  }

  getLastCita(){
    this.citaService.getLastById(this.paciente_id).subscribe({
      next: async (res) =>{
        this.data=res;
        this.enfermedades.get('fecha')!.setValue(res[0].fecha);
        this.enfermedades.get('hora')!.setValue(res[0].hora);
        this.enfermedades.get('especialidad')!.setValue(res[0].consultorios[0].especialidad);
      }
    })
  }

}
