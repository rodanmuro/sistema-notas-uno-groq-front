import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { Asignatura } from '../../interfaces/AsignaturaInterface';
import { Usuario } from '../../interfaces/UsuarioInterface';

@Component({
  selector: 'chat-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  mensajes:string[] = [];
  mensaje:string = "";

  informe: { [key: string]: any }[] = [];
  headers: string[] = [];

  asignaturas: Asignatura[] = [];
  profesores: Usuario[] = [];
  estudiantes: Usuario[] = [];
  
  selectedTable = "tablas";

  constructor(private  apiCallService:ApiCallService){
    this.getAsignaturas();
  }

  agregarMensaje = (mensaje:string):void => {
    this.mensajes.push(mensaje);
    this.mensaje = "";
    this.apiCallService.apiCall(mensaje).subscribe(
      {
        next:(response) => {
          console.log(response);
          this.informe = response;
        }
      }
    );
  }

  getHeaders(arrayObjects:Object[]):string[]{
    if(arrayObjects.length>0){
      return Object.keys(arrayObjects[0])
    }else{
      return []
    }
  }

  // Helper method to get object keys
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getAsignaturas(){
    this.apiCallService.apiGetAsignaturas().subscribe(
      {
        next:(response) => {
          this.asignaturas = response;
        }
      }
    )
  }

  getProfesores(){
    this.apiCallService.apiGetProfesores().subscribe(
      {
        next:(response)=>{
          this.profesores = response;
        }
      }
    )
  }

  getEstudiantes(){
    this.apiCallService.apiGetEstudiantes().subscribe(
      {
        next:(response) => {
          this.estudiantes = response;
        }
      }
    )
  }

  onTableChange(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTable = selectElement.value;

    this.fetchTableData(this.selectedTable);
  }

  fetchTableData(table:string){
    if(table==='asignaturas'){
      this.getAsignaturas();
    }
    if(table==='profesores'){
      this.getProfesores();
    }
    if(table==='estudiantes'){
      this.getEstudiantes();
    }
  }

}
