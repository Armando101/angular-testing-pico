import { FormControl, FormGroup } from '@angular/forms';
import { mockObservable } from 'src/testing';
import { UsersService } from '../services/user.service';
import { MyValidators } from './validators';

describe('Tests for validators', () => {
  describe('Test for validatePassword', () => {
    it('should return null when password is right', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('armando12345');

      // Act
      const rta = MyValidators.validPassword(control);

      // Assert
      expect(rta).toBeNull();
    });

    it('should return error when password is wront', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('armando');

      // Act
      const rta = MyValidators.validPassword(control);

      // Assert
      expect(rta.invalid_password).toBeTrue();
    });
  });

  describe('Test for matchPasswords', () => {
    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456'),
      });

      const rta = MyValidators.matchPasswords(group);

      expect(rta).toBeNull();
    });

    it('should return error', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456789'),
      });

      const rta = MyValidators.matchPasswords(group);

      expect(rta.match_password).toBeTrue();
    });

    it('should return error if not found controls', () => {
      const group = new FormGroup({
        otro: new FormControl('123456'),
        confirmPassword: new FormControl('123456789'),
      });

      const fn = () => {
        MyValidators.matchPasswords(group);
      };

      expect(fn).toThrow(new Error('marchPasswords: fields not found'));
    });
  });

  describe('Test for availabeEmailAsync', () => {
    it('should return null with valid email', (doneFn) => {
      // Arrange
      const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj(
        'ValueService',
        ['isAvailableByEmail']
      );

      userService.isAvailableByEmail.and.returnValue(
        mockObservable({ isAvailable: true })
      );

      const control = new FormControl('armando@gmail.com');
      const validator = MyValidators.validateEmailAsync(userService);
      validator(control).subscribe((rta) => {
        expect(rta).toBeNull();
        doneFn();
      });
    });
  });
});
