import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private estudianteService: EstudianteService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) return;

    this.estudianteService.registrarUsuario(this.registroForm.value).subscribe({
      next: (response: any) => {
        alert('Estudiante registrado correctamente');
        this.registroForm.reset();
      },
      error: (err: any) => {
        console.error(err);
        alert('Hubo un error al registrar el estudiante');
      }
    });
  }
}
