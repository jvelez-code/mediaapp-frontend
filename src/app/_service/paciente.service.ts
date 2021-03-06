import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../_model/paciente';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {  

  pacienteCambio = new Subject<Paciente[]>();
  private mensajeCambio = new Subject<string>();
  private url: string = `${environment.HOST}/pacientes`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrar(paciente: Paciente){
    return this.http.post(this.url, paciente);
  }

  modificar(paciente: Paciente){
    return this.http.put(this.url, paciente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  /////////////get,set/////////////////////

  getPacienteCambio(){
    return this.pacienteCambio.asObservable();
  }
  
  setPacienteCambio(pacientes: Paciente[]){
    return this.pacienteCambio.next(pacientes);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajecambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
