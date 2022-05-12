import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { generateOneUser } from 'src/app/mocks/user.mock';
import { UsersService } from 'src/app/services/user.service';
import {
  asyncData,
  asyncError,
  clickElement,
  getText,
  mockObservable,
  query,
  setInputValue,
} from 'src/testing';

import { RegisterFormComponent } from './register-form.component';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>;
  let routerService: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UsersService', [
      'create',
      'isAvailableByEmail',
    ]);
    const routerServiceSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UsersService, useValue: userServiceSpy },
        { provide: Router, useValue: routerServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    routerService = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component = fixture.componentInstance;
    userService.isAvailableByEmail.and.returnValue(
      mockObservable({ isAvailable: true })
    );
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

  it('should send the form successfully and change "loading" to "success"', fakeAsync(() => {
    component.form.patchValue({
      name: 'Armando',
      email: 'rivera.armando@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true,
    });

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));

    component.register(new Event('submit'));

    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).toBe('success');
    expect(userService.create).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
  }));

  it('should send the form successfully and change "loading" to "success" from UI', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Armando', ['input', 'blur']);
    setInputValue(fixture, 'input#email', 'rivera.armando@gmail.com', [
      'input',
      'blur',
    ]);
    setInputValue(fixture, 'input#password', '123456', ['input', 'blur']);
    setInputValue(fixture, 'input#confirmPassword', '123456', [
      'input',
      'blur',
    ]);
    setInputValue(
      fixture,
      'input#terms',
      'true',
      ['change', 'blur'],
      'checkbox'
    );

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));

    clickElement(fixture, 'btn-submit', true);
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    fixture.detectChanges();

    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).toBe('success');
    expect(userService.create).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
    expect(routerService.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  it('should send the form successfully and change "loading" to "error" from UI', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Armando', ['input', 'blur']);
    setInputValue(fixture, 'input#email', 'rivera.armando@gmail.com', [
      'input',
      'blur',
    ]);
    setInputValue(fixture, 'input#password', '123456', ['input', 'blur']);
    setInputValue(fixture, 'input#confirmPassword', '123456', [
      'input',
      'blur',
    ]);
    setInputValue(
      fixture,
      'input#terms',
      'true',
      ['change', 'blur'],
      'checkbox'
    );

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncError(mockUser));

    clickElement(fixture, 'btn-submit', true);
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    fixture.detectChanges();

    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).toBe('error');
    expect(userService.create).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
  }));

  it('should show error with an invalid email', () => {
    // Arrange
    const emial = 'armando@gmail.com';
    userService.isAvailableByEmail.and.returnValue(
      mockObservable({ isAvailable: false })
    );
    setInputValue(fixture, 'input#email', emial, ['input', 'blur']);

    // Act
    fixture.detectChanges();
    const errorMsg = getText(fixture, 'emailField-available');

    // Assert
    expect(component.emailField.invalid).toBeTrue();
    expect(userService.isAvailableByEmail).toHaveBeenCalledWith(emial);
    expect(errorMsg).toContain('The email is already taken');
  });
});
