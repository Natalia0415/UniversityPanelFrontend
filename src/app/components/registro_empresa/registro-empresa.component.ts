import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-registro-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private empresaService: EmpresaService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      descripcion: ['', Validators.maxLength(200)]
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) return;

    this.empresaService.registrarEmpresa(this.registroForm.value).subscribe({
      next: (response: any) => {
        alert('Empresa registrada correctamente');
        this.registroForm.reset();
      },
      error: (err: any) => {
        console.error(err);
        alert('Hubo un error al registrar la empresa');
      }
    });
  }
}
