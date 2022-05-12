import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { generateOneUser } from 'src/app/mocks/user.mock';
import { UsersService } from 'src/app/services/user.service';
import { getText, mockObservable, query, setInputValue } from 'src/testing';

import { RegisterFormComponent } from './register-form.component';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UsersService', ['create']);
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: UsersService, useValue: userServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    component.emailField?.setValue('This is not an emial');
    expect(component.emailField?.invalid).withContext('wrong email').toBeTrue();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).toBeTrue();
  });

  it('should the password field be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();

    component.passwordField?.setValue('1234');
    expect(component.passwordField?.invalid)
      .withContext('require min 6 characters')
      .toBeTrue();

    component.passwordField?.setValue('asdfasdfasdf');
    expect(component.passwordField?.invalid)
      .withContext('require min 1 ditigs')
      .toBeTrue();

    component.passwordField?.setValue('asdfas3dfasdf');
    expect(component.passwordField?.valid).withContext('Is valid').toBeTrue();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Armando',
      email: 'rivera.armando@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: false,
    });

    expect(component.form.invalid).toBeTruthy();
  });

  it('should the emailField be invalid from UI', () => {
    setInputValue(fixture, 'input#email', 'esto no es un correo', [
      'input',
      'blur',
    ]);
    fixture.detectChanges();
    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  it('should send the form successfully', () => {
    component.form.patchValue({
      name: 'Armando',
      email: 'rivera.armando@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true,
    });

    const mockUser = generateOneUser();
    userService.create.and.returnValue(mockObservable(mockUser));

    component.register(new Event('submit'));

    expect(userService.create).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
  });
});
