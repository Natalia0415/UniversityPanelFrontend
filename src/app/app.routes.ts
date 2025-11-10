import { Routes } from '@angular/router';
import { RegistroEstudianteComponent } from './components/registro_estudiante/registro-estudiante.component';
import { RegistroEmpresaComponent } from './components/registro_empresa/registro-empresa.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registro-usuario', pathMatch: 'full' },
  { path: 'registro-usuario', component: RegistroEstudianteComponent },
  { path: 'registro-empresa', component: RegistroEmpresaComponent },
];