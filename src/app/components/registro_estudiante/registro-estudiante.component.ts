import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EstudianteService } from '../../services/estudiante.service';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/Registrar';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {
   // Inyectar los servicios necesarios
  private estudianteService = inject(EstudianteService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public errorMessage: string = '';

  public registroForm = this.formBuild.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    passWord: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassWord: ['', [Validators.required, Validators.minLength(6)]]

  })

  Register() {
    
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.registroForm.valid){
      const objeto:Register = {
      userName: this.registroForm.value.userName ?? '',
      email: this.registroForm.value.email ?? '',
      passWord: this.registroForm.value.passWord ?? '',
      confirmPassword: this.registroForm.value.confirmPassWord ?? ''
    }

    this.estudianteService.Register(objeto).subscribe({ 
      next: (response) => {
        if (response.success) {
          alert('Estudiante registrado correctamente');
        } else {
          // Mostrar mensaje de error
          alert('Hubo un error al registrar el estudiante');
        }
      },
      error: (error) => {
        // Manejar el error de la solicitud
        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error del servidor o red.';
        }
      }
    })
    };
  }
}
