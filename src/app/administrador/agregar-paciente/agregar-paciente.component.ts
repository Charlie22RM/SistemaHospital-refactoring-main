import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css'],
})
export class AgregarPacienteComponent implements OnInit {
  validateFrm!: FormGroup;
  durationInSeconds = 5;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private router: Router,
    private fb: FormBuilder,

    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateFrm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      cedula: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submitForm() {

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  crearcuenta() {

  }

  regresar() {
    this.router.navigate(['/administrador/listar-pacientes']);
  }
}
