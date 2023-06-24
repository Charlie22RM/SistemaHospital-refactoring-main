import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PacientesService } from 'src/app/services/pacientes.service';
import { HistorialDisplay } from 'src/app/models/userHistorial';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.css'],
})
export class HistorialClinicoComponent implements OnInit {
  enfermedades!: FormGroup;
  private paciente_id: number = 0;
  historial!: HistorialDisplay;
  durationInSeconds = 5;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pacienteService: PacientesService,
    private snackBar: MatSnackBar
  ) {
    this.enfermedades = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
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
    });
  }

  async ngOnInit() {
    console.log("aqui estoy");
    this.paciente_id = this.activatedRoute.snapshot.params['paciente_id'];
    let promise1 = this.getDataPaciente();
    Promise.all([promise1]);
  }

  getDataPaciente() {
    this.pacienteService.getHistorial(this.paciente_id).subscribe({
      next: async (res) => {
        console.log("prueba");
        console.log(res);
        this.historial=res;
        console.log(this.historial.historialClinico);
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
  }
  submitForm() {
    if (this.enfermedades.valid) {
      this.editarHistorial(this.enfermedades.value);
    } else {
      Object.values(this.enfermedades.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  async editarHistorial(formData:any) {
    const nombres ={
      nombre: formData.nombre,
      apellido: formData.apellido
    }
    console.log("nombres: ",nombres);

    const datosRestantes = {
      // Obtener los valores del formulario, excluyendo nombre y apellido
      ...formData,
      nombre: null,
      apellido: null
    };
    try{
      await this.pacienteService.updateNombreYapellido( this.paciente_id,nombres);
    }catch(err){
      this.openSnackBar( 'error');
      console.log(err);
    }
    try {
      const historial_id= this.historial.historialClinico!.id;
      await this.pacienteService.updateHistorial(historial_id,datosRestantes);
      this.openSnackBar("Historial editado");
      //Retraso de 2sg para mostrar el mensaje
await new Promise((resolve) => setTimeout(resolve, 2000));          
    this.router.navigate(['/medicos']);
    } catch (err:any) {
      // Captura el error y maneja el caso de error aquí
      this.openSnackBar( 'error');
      console.log(err);
    }
    
  }


  openSnackBar(Message:string) {
    this.snackBar.open(Message,'Cerrar',{
      duration: this.durationInSeconds * 1000,
      verticalPosition: this.verticalPosition,
    });
  }

  regresar() {
    this.router.navigate(['/medicos']);
  }
}
