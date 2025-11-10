import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroEstudianteComponent } from './registro-estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EstudianteService } from '../../services/estudiante.service';
import { of, throwError } from 'rxjs';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { AuthResponse } from '../../interfaces/AuthResponse';

describe('RegistroEstudianteComponent', () => {
  let component: RegistroEstudianteComponent;
  let fixture: ComponentFixture<RegistroEstudianteComponent>;
  let mockService: jasmine.SpyObj<EstudianteService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<EstudianteService>('EstudianteService', ['Register']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegistroEstudianteComponent],
      providers: [{ provide: EstudianteService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.registroForm.valid).toBeFalsy();
  });

  it('form should be valid when filled correctly', () => {
    component.registroForm.setValue({
      userName: 'Juan',
      email: 'juan@test.com',
      passWord: '123456',
      confirmPassWord: '123456'
    });

    expect(component.registroForm.valid).toBeTruthy();
  });

  it('should call Register on valid form submission', () => {
    component.registroForm.setValue({
      userName: 'Juan',
      email: 'juan@test.com',
      passWord: '123456',
      confirmPassWord: '123456'
    });

    const fakeResponse: ApiResponse<AuthResponse> = {
      success: true,
      message: 'Registro exitoso',
      data: {
        token: 'abc123',
        expirationDate: '2025-12-31T23:59:59Z',
        userName: 'Juan',
        email: 'juan@test.com'
      }
    };

    mockService.Register.and.returnValue(of(fakeResponse));

    component.onSubmit();

    expect(mockService.Register).toHaveBeenCalledTimes(1);
  });

  it('should set errorMessage on service error with message', () => {
    component.registroForm.setValue({
      userName: 'Juan',
      email: 'juan@test.com',
      passWord: '123456',
      confirmPassWord: '123456'
    });

    const errorResponse = { error: { message: 'Error del servidor' } };

    mockService.Register.and.returnValue(throwError(() => errorResponse));

    component.onSubmit();

    expect(component.errorMessage).toBe('Error del servidor');
  });

  it('should set default errorMessage if server error has no message', () => {
    component.registroForm.setValue({
      userName: 'Juan',
      email: 'juan@test.com',
      passWord: '123456',
      confirmPassWord: '123456'
    });

    const errorResponse = { error: {} };

    mockService.Register.and.returnValue(throwError(() => errorResponse));

    component.onSubmit();

    expect(component.errorMessage).toBe('Error del servidor o red.');
  });
});
