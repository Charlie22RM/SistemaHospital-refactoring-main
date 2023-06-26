import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultorio } from 'src/app/models/consultorio';
import { OpcionesMedicos } from 'src/app/models/opcionesMedicos';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { MedicoService } from 'src/app/services/medico.service';

/**
 * Componente para editar un consultorio.
 * @remarks
 * Este componente permite editar la especialidad y el médico asociado a un consultorio.
 */
@Component({
  selector: 'app-editar-consultorio',
  templateUrl: './editar-consultorio.component.html',
  styleUrls: ['./editar-consultorio.component.css'],
})
export class EditarConsultorioComponent implements OnInit {
  /**
   * Formulario de validación para los campos de edición.
   */
  validateFrm!: FormGroup;

  /**
   * Identificador del consultorio a editar.
   */
  public consultorio_id = 0;

  /**
   * Consultorio a editar.
   */
  consultorio!: Consultorio;

  /**
   * Opciones de médicos disponibles.
   */
  opcionesMedicos: OpcionesMedicos[] = [];

  /**
   * Duración en segundos para la notificación de la barra de snacks.
   */
  durationInSeconds = 5;

  /**
   * Posición vertical de la barra de snacks.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
   * Crea una instancia de EditarConsultorioComponent.
   * @param router - El enrutador de Angular.
   * @param activatedRoute - El objeto de la ruta activada en Angular.
   * @param fb - Constructor de formularios de Angular.
   * @param consultorioService - Servicio para realizar operaciones en los consultorios.
   * @param medicoService - Servicio para realizar operaciones en los médicos.
   * @param snackBar - Componente de barra de snacks de Angular Material.
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private consultorioService: ConsultorioService,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar
  ) {
    this.validateFrm = this.fb.group({
      especialidad: ['', [Validators.required]],
      medico_id: ['', [Validators.required, this.validateSeleccionEspecialidad]],
    });
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  async ngOnInit() {
    this.consultorio_id = this.activatedRoute.snapshot.params['consultorio_id'];
    const promise1 = this.getConsultorio(this.consultorio_id);
    const promise2 = this.getMedicosNames();
    await Promise.all([promise1, promise2]);
  }

  /**
   * Envía el formulario de edición.
   * Si el formulario es válido, llama al método de edición del consultorio.
   * Si el formulario no es válido, marca los controles como inválidos.
   */
  submitForm() {
    if (this.validateFrm.valid) {
      this.editConsultorio(this.validateFrm.value);
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
   * Edita el consultorio.
   * @param formData - Datos del formulario de edición.
   */
  editConsultorio(formData: unknown) {
    this.consultorioService.editConsultorio(this.consultorio_id, formData).subscribe(
      {
        next: async (res) => {
          console.log(res);
          this.openSnackBar('Consultorio editado');
          await new Promise((resolve) => setTimeout(resolve, 2000));
          this.router.navigate(['/administrador']);
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
   * Obtiene los datos del consultorio a editar.
   * @param consultorio_id - Identificador del consultorio.
   */
  async getConsultorio(consultorio_id: number) {
    try {
      const response = await this.consultorioService.getOneById(consultorio_id);
      console.log(response);
      this.consultorio = response;
      const consultorio = {
        id: response.medico.id,
        label: `${response.medico.nombre} ${response.medico.apellido}`,
      };
      this.opcionesMedicos.push(consultorio);
      this.validateFrm = this.fb.group({
        especialidad: [this.consultorio.especialidad, [Validators.required]],
        medico_id: [
          this.consultorio.medico.id,
          [Validators.required, this.validateSeleccionEspecialidad],
        ],
      });
      Promise.resolve();
    } catch (err) {
      Promise.reject(err);
    }
  }

  /**
   * Obtiene los nombres de los médicos disponibles.
   */
  async getMedicosNames() {
    try {
      const response = await this.medicoService.getAllNames();
      const opcionesMedicos: OpcionesMedicos[] = [];
      response.forEach(
        (usuario: { id: number; nombre: string; apellido: string }) => {
          const opcionMedico = {
            id: usuario.id,
            label: `${usuario.nombre} ${usuario.apellido}`,
          };
          Array.prototype.push.apply(opcionesMedicos, [opcionMedico]);
        }
      );
      console.log(opcionesMedicos);
      this.opcionesMedicos.push(...opcionesMedicos);
      Promise.resolve();
    } catch (err) {
      Promise.reject(err);
    }
  }

  /**
   * Valida la selección de especialidad.
   * @param control - Control de formulario.
   * @returns Un objeto si la selección es requerida y no se ha realizado, de lo contrario, devuelve null.
   */
  validateSeleccionEspecialidad(control: AbstractControl) {
    if (control.value === null || control.value === '') {
      return { required: true };
    }
    return null;
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
   * Navega hacia la página de administrador.
   */
  regresar() {
    this.router.navigate(['/administrador']);
  }
}