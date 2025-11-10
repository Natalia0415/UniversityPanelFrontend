import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroEmpresaComponent } from './registro-empresa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmpresaService } from '../../services/empresa.service';
import { of, throwError } from 'rxjs';

describe('RegistroEmpresaComponent', () => {
  let component: RegistroEmpresaComponent;
  let fixture: ComponentFixture<RegistroEmpresaComponent>;
  let mockService: jasmine.SpyObj<EmpresaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EmpresaService', ['registrarEmpresa']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegistroEmpresaComponent],
      providers: [{ provide: EmpresaService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEmpresaComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(EmpresaService) as jasmine.SpyObj<EmpresaService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.registroForm.valid).toBeFalsy();
  });

  it('should call registrarEmpresa when form is valid', () => {
    component.registroForm.setValue({
      nombre: 'Empresa X',
      contacto: 'Juan',
      correo: 'contacto@empresa.com',
      contrasena: '123456',
      descripcion: 'Empresa de prueba'
    });

    mockService.registrarEmpresa.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(mockService.registrarEmpresa).toHaveBeenCalled();
  });

  it('should handle error response', () => {
    component.registroForm.setValue({
      nombre: 'Empresa X',
      contacto: 'Juan',
      correo: 'contacto@empresa.com',
      contrasena: '123456',
      descripcion: 'Empresa de prueba'
    });

    mockService.registrarEmpresa.and.returnValue(throwError(() => ({ error: 'Error servidor' })));

    component.onSubmit();

    // Aquí puedes agregar expectativas sobre alert, console, etc.
  });
});
