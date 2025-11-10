import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  private apiUrl = 'https://localhost:7188/api/Empresa';

  constructor(private http: HttpClient) {}

  registrarEmpresa(empresa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, empresa);
  }
}
