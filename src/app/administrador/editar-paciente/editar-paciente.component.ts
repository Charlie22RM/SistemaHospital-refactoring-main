import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

/**
 * Componente para editar un paciente.
 * @remarks
 * Este componente permite editar los datos de un paciente existente.
 */
@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css'],
})
export class EditarPacienteComponent implements OnInit {
  /**
   * Formulario de validación para los campos de edición.
   */
  validateFrm!: FormGroup;

  /**
   * Duración en segundos para la notificación de la barra de snacks.
   */
  durationInSeconds = 5;

  /**
   * Posición vertical de la barra de snacks.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
   * Crea una instancia de EditarPacienteComponent.
   * @param router - El enrutador de Angular.
   * @param fb - Constructor de formularios de Angular.
   * @param snackBar - Componente de barra de snacks de Angular Material.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
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

  /**
   * Envía el formulario de edición.
   * Este método está vacío y debe ser implementado con la lógica necesaria.
   */
  submitForm() {
    // Implementar la lógica para enviar el formulario de edición.
  }

  /**
   * Navega hacia la página de listar pacientes.
   */
  regresar() {
    this.router.navigate(['/administrador/listar-pacientes']);
  }
}

