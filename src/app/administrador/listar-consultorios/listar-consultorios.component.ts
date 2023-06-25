import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Consultorio } from 'src/app/models/consultorio';
import { ConsultorioService } from 'src/app/services/consultorio.service';

@Component({
  selector: 'app-listar-consultorios',
  templateUrl: './listar-consultorios.component.html',
  styleUrls: ['./listar-consultorios.component.css'],
})
export class ListarConsultoriosComponent implements OnInit {
  data!: Consultorio[];
  displayedColumns: string[] = [
    'id',
    'especialidad',
    'nombre_medico',
    'apellido_medico',
    'actions',
  ];
  dataSource = new MatTableDataSource<Consultorio>();
  filterValue = '';
  constructor(
    private router: Router,
    private consultorioService: ConsultorioService
  ) { }

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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editElement(consultorio: Consultorio) {
    // eslint-disable-next-line camelcase
    const consultorio_id = consultorio.id;
    // eslint-disable-next-line camelcase
    this.router.navigate(['administrador/editar-consultorio', consultorio_id]);
  }
  deleteConsultorio(consultorio: Consultorio) {
    // eslint-disable-next-line camelcase
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

  addConsultorio() {
    this.router.navigate(['administrador/agregar-consultorio']);
  }

}
