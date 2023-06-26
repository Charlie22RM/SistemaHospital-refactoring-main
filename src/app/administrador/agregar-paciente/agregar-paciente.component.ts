/**
 * Componente para agregar un paciente.
 * @remarks
 * Este componente permite agregar un paciente a través de un formulario.
 */
@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css'],
})
export class AgregarPacienteComponent implements OnInit {
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
   * Crea una instancia de AgregarPacienteComponent.
   * @param router - El enrutador de Angular.
   * @param fb - Constructor de formularios para crear el FormGroup.
   * @param snackBar - Componente de barra de snack para mostrar mensajes.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
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
   * Envía el formulario.
   */
  submitForm() {
    // Vacío
  }

  /**
   * Crea una cuenta de paciente.
   */
  crearcuenta() {
    // Vacío
  }

  /**
   * Navega hacia la página de listar pacientes del administrador.
   */
  regresar() {
    this.router.navigate(['/administrador/listar-pacientes']);
  }
}