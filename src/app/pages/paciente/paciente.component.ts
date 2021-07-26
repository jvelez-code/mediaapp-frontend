import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from 'src/app/_model/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  
  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource!: MatTableDataSource<Paciente>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private pacienteService: PacienteService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //se ejecuta al hacele solo next la reactiva
    this.pacienteService.getPacienteCambio().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


    this.pacienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    //se ejecuta al cargar la pagina
    this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

}
