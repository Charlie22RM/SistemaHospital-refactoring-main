/**
 * Componente para agregar un consultorio.
 * @remarks
 * Este componente permite agregar un consultorio a través de un formulario.
 */
@Component({
  selector: 'app-agregar-consultorio',
  templateUrl: './agregar-consultorio.component.html',
  styleUrls: ['./agregar-consultorio.component.css'],
})
export class AgregarConsultorioComponent implements OnInit {
  /**
   * FormGroup utilizado para validar y manejar los controles del formulario
   */
  validateFrm!: FormGroup;

  /**
   * Lista de opciones de médicos para seleccionar.
   */
  opcionesMedicos: OpcionesMedicos[] = [];

  /**
   * Duración en segundos para mostrar la barra de snack.
   */
  durationInSeconds = 5;

  /**
   * Posición vertical de la barra de snack.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
   * Crea una instancia de AgregarConsultorioComponent.
   * @param router - El enrutador de Angular.
   * @param fb - Constructor de formularios para crear el FormGroup.
   * @param medicoService - Servicio para obtener información de los médicos.
   * @param consultorioService - Servicio para interactuar con los consultorios.
   * @param snackBar - Componente de barra de snack para mostrar mensajes.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private consultorioService: ConsultorioService,
    private snackBar: MatSnackBar
  ) {
    this.validateFrm = this.fb.group({
      especialidad: ['', [Validators.required]],
      medico_id: [
        '',
        [Validators.required, this.validateSeleccionEspecialidad],
      ],
    });
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * @returns Una promesa que se resuelve cuando se completa la inicialización.
   */
  async ngOnInit() {
    // No realiza ninguna acción al iniciar el componente
  }

  /**
   * Validador personalizado para verificar la selección de una especialidad.
   * @param control - Control abstracto que representa el campo de formulario.
   * @returns Un objeto si la validación falla, de lo contrario, null.
   */
  validateSeleccionEspecialidad(control: AbstractControl) {
    if (control.value === null || control.value === '') {
      return { required: true };
    }
    return null;
  }

  /**
   * Envía el formulario si es válido, de lo contrario, marca los controles inválidos como sucios.
   */
  submitForm() {
    if (this.validateFrm.valid) {
      this.addConsultorio(this.validateFrm.value);
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
   * Obtiene los nombres de los médicos desde el servicio y los agrega a la lista de opciones.
   * @returns Una promesa que se resuelve cuando se obtienen los nombres de los médicos.
   * @throws Error si ocurre algún problema al obtener los nombres de los médicos.
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
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Agrega un consultorio utilizando el servicio de consultorios.
   * @param formData - Los datos del formulario para crear el consultorio.
   */
  addConsultorio(formData: unknown) {
    this.consultorioService.createConsultorio(formData).subscribe({
      next: async (res) => {
        console.log(res);
        this.openSnackBar('Consultorio creado');
        // Retraso de 2 segundos para mostrar el mensaje
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
   * Abre una barra de snack con el mensaje especificado.
   * @param message - El mensaje a mostrar en la barra de snack.
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
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