import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MedicoDisplay } from 'src/app/models/medico';
import { MedicoService } from 'src/app/services/medico.service';

/**
 * Componente para listar los médicos.
 * @remarks
 * Este componente muestra una lista de médicos y permite realizar acciones como editar o eliminar un médico.
 */
@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.css'],
})
export class ListarMedicosComponent implements OnInit {
  /**
   * Datos de los médicos.
   */
  data!: MedicoDisplay[];

  /**
   * Fuente de datos para la tabla.
   */
  dataSource = new MatTableDataSource<MedicoDisplay>();

  /**
   * Columnas que se mostrarán en la tabla.
   */
  displayedColumns: string[] = [
    'id',
    'email',
    'cedula',
    'nombre',
    'apellido',
    'direccion',
    'actions',
  ];

  /**
   * Crea una instancia de ListarMedicosComponent.
   * @param router - El enrutador de Angular.
   * @param medicoService - El servicio de médicos.
   */
  constructor(
    private router: Router,
    private medicoService: MedicoService
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.medicoService.getAll().subscribe({
      next: async (res) => {
        this.data = res;
        console.log('data: ', this.data);
        this.dataSource = new MatTableDataSource(this.data);
      },
    });
  }

  /**
   * Aplica el filtro en la tabla.
   * @param event - El evento de entrada.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Navega hacia la página de agregar un médico.
   */
  addConsultorio() {
    this.router.navigate(['administrador/agregar-medico']);
  }

  /**
   * Edita un médico.
   * @param medico - El médico a editar.
   */
  editMedico(medico: MedicoDisplay) {
    const medico_id = medico.id;
    this.router.navigate(['administrador/editar-medico', medico_id]);
  }

  /**
   * Elimina un médico.
   * @param medico - El médico a eliminar.
   */
  deleteMedico(medico: MedicoDisplay) {
    const medico_id = medico.id;
    this.medicoService.deleteMedico(medico_id).subscribe(() => {
      this.medicoService.getAll().subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
          this.dataSource = new MatTableDataSource(this.data);
        },
      });
    });
  }
}