import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignatura } from '../interfaces/AsignaturaInterface';
import { Usuario } from '../interfaces/UsuarioInterface';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  public URL_BASE:string =  "http://localhost:3000";

  constructor(private http:HttpClient) { 

  }

  apiCall(prompt:string):Observable<any> {
    return this.http.get(this.URL_BASE+"/peticion?prompt="+prompt)
  }

  apiGetAsignaturas():Observable<Asignatura[]>{
    return this.http.get<Asignatura[]>(this.URL_BASE+"/asignatura");
  }

  apiGetProfesores():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.URL_BASE+"/usuario/profesor")
  }
}
