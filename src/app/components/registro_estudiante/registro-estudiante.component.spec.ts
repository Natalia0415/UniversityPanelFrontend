import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroEstudianteComponent } from './registro-estudiante.component';
import { EstudianteService } from '../../services/estudiante.service';
import { of, throwError } from 'rxjs';

describe('RegistroEstudianteComponent', () => {
  let component: RegistroEstudianteComponent;
  let fixture: ComponentFixture<RegistroEstudianteComponent>;
  let mockService: Partial<EstudianteService>;

  beforeEach(async () => {
    mockService = {
      registrar: (data: any) => of({ success: true })
    };

    await TestBed.configureTestingModule({
      declarations: [RegistroEstudianteComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: EstudianteService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Formulario inválido si está vacío', () => {
    expect(component.registroForm.valid).toBeFalse();
  });

  it('Campo correo debe tener formato válido', () => {
    const correo = component.registroForm.controls['correo'];
    correo.setValue('no-es-correo');
    expect(correo.valid).toBeFalse();
  });

  it('Formulario válido con datos correctos', () => {
    component.registroForm.setValue({
      nombreCompleto: 'Juan Pérez',
      documento: '123456',
      correo: 'juan@ucn.edu.co',
      programa: 'Ingeniería',
      telefono: '3101234567',
      contraseña: '123456'
    });
    expect(component.registroForm.valid).toBeTrue();
  });

  it('Llama al servicio registrar al enviar formulario válido', () => {
    spyOn(mockService, 'registrar').and.returnValue(of({}));
    component.registroForm.setValue({
      nombreCompleto: 'Juan Pérez',
      documento: '123',
      correo: 'juan@ucn.edu.co',
      programa: 'Ingeniería',
      telefono: '310',
      contraseña: '123456'
    });
    component.onSubmit();
    expect(mockService.registrar).toHaveBeenCalled();
  });

  it('Muestra error si el servicio falla', () => {
    (mockService.registrar as any) = () => throwError(() => ({ error: { message: 'falló' } }));
    spyOn(mockService, 'registrar').and.callThrough();
    component.registroForm.setValue({
      nombreCompleto: 'Juan Pérez',
      documento: '123',
      correo: 'juan@ucn.edu.co',
      programa: 'Ingeniería',
      telefono: '310',
      contraseña: '123456'
    });
    component.onSubmit();
    expect(component.errorMessage).toContain('falló');
  });
});
