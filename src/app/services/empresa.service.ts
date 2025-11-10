import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Router } from '@angular/router';
import { Empresa } from '../interfaces/Empresa';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({ providedIn: 'root' })
export class EmpresaService {

  private http = inject(HttpClient);
  private baseUrl:string = appsettings.apiUrl;
  private router = inject(Router);


  registrarEmpresa(objeto:Empresa):Observable<ApiResponse<Empresa>>{
      return this.http.post<ApiResponse<Empresa>>(`${this.baseUrl}Empresa`, objeto);
  }
}
