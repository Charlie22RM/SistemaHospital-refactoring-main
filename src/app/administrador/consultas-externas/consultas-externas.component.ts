import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Consultorio } from 'src/app/models/consultorio';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { MedicoDisplay } from 'src/app/models/medico';
import { MedicoService } from 'src/app/services/medico.service';

/**
 * Componente para mostrar las consultas externas.
 * @remarks
 * Este componente muestra una lista de consultorios y médicos para consultas externas.
 */
@Component({
  selector: 'app-consultas-externas',
  templateUrl: './consultas-externas.component.html',
  styleUrls: ['./consultas-externas.component.css'],
})
export class ConsultasExternasComponent implements OnInit {
  /**
   * Datos de los consultorios.
   */
  data!: Consultorio[];

  /**
   * Columnas a mostrar en la tabla de consultorios.
   */
  displayedColumns: string[] = [
    'id',
    'especialidad',
    'nombre_medico',
    'apellido_medico',
  ];

  /**
   * Fuente de datos para la tabla de consultorios.
   */
  dataSource = new MatTableDataSource<Consultorio>();

  /**
   * Valor del filtro para la tabla de consultorios.
   */
  filterValue = '';

  /**
   * Datos de los médicos.
   */
  data2!: MedicoDisplay[];

  /**
   * Fuente de datos para la tabla de médicos.
   */
  dataSource2 = new MatTableDataSource<MedicoDisplay>();

  /**
   * Columnas a mostrar en la tabla de médicos.
   */
  displayedColumns2: string[] = [
    'id',
    'email',
    'nombre',
    'apellido',
    'direccion',
  ];

  /**
   * Crea una instancia de ConsultasExternasComponent.
   * @param router - El enrutador de Angular.
   * @param consultorioService - Servicio para obtener los datos de los consultorios.
   * @param medicoService - Servicio para obtener los datos de los médicos.
   */
  constructor(
    private router: Router,
    private consultorioService: ConsultorioService,
    private medicoService: MedicoService
  ) { }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.consultorioService.getAll().subscribe(
      {
        next: async (res) => {
          console.log(res);
          this.data = res;
          this.dataSource = new MatTableDataSource(this.data);
        },
      }
    );

    this.medicoService.getAll().subscribe(
      {
        next: async (res) => {
          this.data2 = res;
          console.log('data2: ', this.data2);
          this.dataSource2 = new MatTableDataSource(this.data2);
        },
      }
    );
  }
}
