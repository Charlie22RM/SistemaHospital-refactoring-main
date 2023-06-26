import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Consultorio } from 'src/app/models/consultorio';
import { ConsultorioService } from 'src/app/services/consultorio.service';

/**
 * Componente para listar los consultorios.
 * @remarks
 * Este componente muestra una lista de consultorios y permite realizar acciones como editar o eliminar un consultorio.
 */
@Component({
  selector: 'app-listar-consultorios',
  templateUrl: './listar-consultorios.component.html',
  styleUrls: ['./listar-consultorios.component.css'],
})
export class ListarConsultoriosComponent implements OnInit {
  /**
   * Datos de los consultorios.
   */
  data!: Consultorio[];

  /**
   * Columnas que se mostrarán en la tabla.
   */
  displayedColumns: string[] = [
    'id',
    'especialidad',
    'nombre_medico',
    'apellido_medico',
    'actions',
  ];

  /**
   * Fuente de datos para la tabla.
   */
  dataSource = new MatTableDataSource<Consultorio>();

  /**
   * Valor de filtro para la tabla.
   */
  filterValue = '';

  /**
   * Crea una instancia de ListarConsultoriosComponent.
   * @param router - El enrutador de Angular.
   * @param consultorioService - El servicio de consultorios.
   */
  constructor(
    private router: Router,
    private consultorioService: ConsultorioService
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.consultorioService.getAll().subscribe({
      next: async (res) => {
        console.log(res);
        this.data = res;
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
   * Edita un consultorio.
   * @param consultorio - El consultorio a editar.
   */
  editElement(consultorio: Consultorio) {
    const consultorio_id = consultorio.id;
    this.router.navigate(['administrador/editar-consultorio', consultorio_id]);
  }

  /**
   * Elimina un consultorio.
   * @param consultorio - El consultorio a eliminar.
   */
  deleteConsultorio(consultorio: Consultorio) {
    const consultorio_id = consultorio.id;
    this.consultorioService.deleteConsultorio(consultorio_id).subscribe(() => {
      this.consultorioService.getAll().subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
          this.dataSource = new MatTableDataSource(this.data);
        },
      });
    });
  }

  /**
   * Navega hacia la página de agregar un consultorio.
   */
  addConsultorio() {
    this.router.navigate(['administrador/agregar-consultorio']);
  }
}