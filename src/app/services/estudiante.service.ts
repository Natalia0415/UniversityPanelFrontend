import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { appsettings } from '../settings/appsettings';
import { Register } from '../interfaces/Registrar';
import { ApiResponse } from '../interfaces/ApiResponse';
import { AuthResponse } from '../interfaces/AuthResponse';


@Injectable({ providedIn: 'root' })
export class EstudianteService {

   private http = inject(HttpClient);
  private baseUrl:string = appsettings.apiUrl;
  private router = inject(Router);

  
   /**
   * Método para registrar un nuevo usuario.
   * @param objeto Objeto que contiene los datos del usuario a registrar.
   * @returns Observable<ApiResponse<AuthResponse>> que contiene la respuesta de la API.
   */
  Register(objeto:Register):Observable<ApiResponse<AuthResponse>>{
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}Auth/register`, objeto, {
      withCredentials: true
    });
  }
}
