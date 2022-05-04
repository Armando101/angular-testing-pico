import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should create service', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '123123',
      };
      const email = 'armando101@gmail.com';
      const password = '123123123';

      // Act
      authService.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return a token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '123123',
      };
      const email = 'armando101@gmail.com';
      const password = '123123123';
      spyOn(tokenService, 'saveToken').and.callThrough();

      // Act
      authService.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith(
          mockData.access_token
        );
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });
});
