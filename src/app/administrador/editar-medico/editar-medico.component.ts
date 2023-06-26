/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MedicoService } from 'src/app/services/medico.service';
import { MedicoDisplay } from 'src/app/models/medico';

/**
 * Componente para editar un médico.
 * @remarks
 * Este componente permite editar los datos de un médico existente.
 */
@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.css'],
})
export class EditarMedicoComponent implements OnInit {
  /**
   * Formulario de validación para los campos de edición.
   */
  validateFrm!: FormGroup;

  /**
   * Identificador del médico a editar.
   */
  public medico_id = 0;

  /**
   * Médico a editar.
   */
  medico!: MedicoDisplay;

  /**
   * Duración en segundos para la notificación de la barra de snacks.
   */
  durationInSeconds = 5;

  /**
   * Posición vertical de la barra de snacks.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
   * Crea una instancia de EditarMedicoComponent.
   * @param router - El enrutador de Angular.
   * @param fb - Constructor de formularios de Angular.
   * @param medicoService - Servicio para realizar operaciones en los médicos.
   * @param activatedRoute - El objeto de la ruta activada en Angular.
   * @param snackBar - Componente de barra de snacks de Angular Material.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
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
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  async ngOnInit(): Promise<void> {
    this.medico_id = this.activatedRoute.snapshot.params['medico_id'];
  }

  /**
   * Envía el formulario de edición.
   * Si el formulario es válido, llama al método de edición del médico.
   * Si el formulario no es válido, marca los controles como inválidos.
   */
  submitForm() {
    if (this.validateFrm.valid) {
      this.editMedico(this.validateFrm.value);
    } else {
      Object.values(this.validateFrm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  /**
   * Crea una cuenta.
   * Este método contiene código adicional que debe ser implementado.
   */
  crearcuenta() {
    // Código adicional
  }

  /**
   * Obtiene los datos del médico a editar.
   * @param medico_id - Identificador del médico.
   */
  async getMedico(medico_id: number) {
    this.medicoService.getMedicoById(medico_id).subscribe({
      next: async (res) => {
        console.log('medico: ', res);
        this.validateFrm = this.fb.group({
          email: [res.email, [Validators.required, Validators.email]],
          password: [res.password, [Validators.required]],
          cedula: [res.cedula, [Validators.required]],
          nombre: [res.nombre, [Validators.required]],
          apellido: [res.apellido, [Validators.required]],
          direccion: [res.direccion, [Validators.required]],
        });
      },
      error: (err) => {
        if (err.error.statusCode === 409) {
          err.error.message;
          this.openSnackBar(err.error.message);
        }
      },
    });
  }

  /**
   * Abre una barra de snacks con un mensaje.
   * @param Message - Mensaje a mostrar en la barra de snacks.
   */
  openSnackBar(Message: string) {
    this.snackBar.open(Message, 'Cerrar', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: this.verticalPosition,
    });
  }

  /**
   * Edita los datos del médico.
   * @param data - Datos del formulario de edición.
   */
  editMedico(data: any) {
    this.medicoService.updateMedico(this.medico_id, data).subscribe({
      next: async (res) => {
        this.openSnackBar('Medico editado');
        // Retraso de 2sg para mostrar el mensaje
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.router.navigate(['/administrador/listar-medicos']);
      },
      error: (err) => {
        if (err.error.statusCode === 409) {
          err.error.message;
          this.openSnackBar(err.error.message);
        }
      },
    });
  }

  /**
   * Navega hacia la página de listar médicos.
   */
  regresar() {
    this.router.navigate(['/administrador/listar-medicos']);
  }
}