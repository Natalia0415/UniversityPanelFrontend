import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroEmpresaComponent } from './registro-empresa.component';
import { EmpresaService } from '../../services/empresa.service';
import { of, throwError } from 'rxjs';

describe('RegistroEmpresaComponent', () => {
  let component: RegistroEmpresaComponent;
  let fixture: ComponentFixture<RegistroEmpresaComponent>;
  let mockService: Partial<EmpresaService>;

  beforeEach(async () => {
    mockService = {
      registrar: (data: any) => of({ success: true })
    };

    await TestBed.configureTestingModule({
      declarations: [RegistroEmpresaComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: EmpresaService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Formulario inválido si está vacío', () => {
    expect(component.registroForm.valid).toBeFalse();
  });

  it('Correo empresa válido', () => {
    const correo = component.registroForm.controls['correo'];
    correo.setValue('bad-email');
    expect(correo.valid).toBeFalse();
  });

  it('Formulario válido con datos correctos', () => {
    component.registroForm.setValue({
      nombreEmpresa: 'Mi Empresa',
      nit: '900123456',
      correo: 'info@empresa.com',
      representante: 'Ana',
      telefono: '3201234567',
      contraseña: 'abcdef'
    });
    expect(component.registroForm.valid).toBeTrue();
  });

  it('Llama al servicio registrar al enviar formulario válido', () => {
    spyOn(mockService, 'registrar').and.returnValue(of({}));
    component.registroForm.setValue({
      nombreEmpresa: 'Mi Empresa',
      nit: '900123',
      correo: 'info@empresa.com',
      representante: 'Ana',
      telefono: '320',
      contraseña: 'abcdef'
    });
    component.onSubmit();
    expect(mockService.registrar).toHaveBeenCalled();
  });

  it('Muestra error si el servicio falla', () => {
    (mockService.registrar as any) = () => throwError(() => ({ error: { message: 'error servidor' } }));
    spyOn(mockService, 'registrar').and.callThrough();
    component.registroForm.setValue({
      nombreEmpresa: 'Mi Empresa',
      nit: '900123',
      correo: 'info@empresa.com',
      representante: 'Ana',
      telefono: '320',
      contraseña: 'abcdef'
    });
    component.onSubmit();
    expect(component.errorMessage).toContain('error servidor');
  });
});
