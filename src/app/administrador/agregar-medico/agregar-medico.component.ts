/**
 * Componente para agregar un médico.
 * @remarks
 * Este componente permite agregar un médico a través de un formulario.
 */
@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.css'],
})
export class AgregarMedicoComponent implements OnInit {
  /**
   * FormGroup utilizado para validar y manejar los controles del formulario.
   */
  validateFrm!: FormGroup;

  /**
   * Duración en segundos para mostrar la barra de snack.
   */
  durationInSeconds = 5;

  /**
   * Posición vertical de la barra de snack.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
   * Crea una instancia de AgregarMedicoComponent.
   * @param router - El enrutador de Angular.
   * @param fb - Constructor de formularios para crear el FormGroup.
   * @param medicoService - Servicio para interactuar con los médicos.
   * @param snackBar - Componente de barra de snack para mostrar mensajes.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar
  ) { }

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
   * Envía el formulario si es válido, de lo contrario, marca los controles inválidos como sucios.
   */
  submitForm() {
    if (this.validateFrm.valid) {
      this.crearcuenta(this.validateFrm.value);
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
   * Crea una cuenta de médico utilizando el servicio de médicos.
   * @param formData - Los datos del formulario para crear la cuenta.
   */
  crearcuenta(formData: unknown) {
    this.medicoService.createMedico(formData).subscribe({
      next: async (res) => {
        console.log(res);
        this.openSnackBar('Cuenta creada');
        // Retraso de 2 segundos para mostrar el mensaje
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
   * Navega hacia la página de listar médicos del administrador.
   */
  regresar() {
    this.router.navigate(['/administrador/listar-medicos']);
  }
}
