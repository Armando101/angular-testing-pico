import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value" ', () => {
      const expectedValue = 'my value';
      const rta = service.getValue();
      expect(rta).toBe(expectedValue);
    });
  });

  describe('Test for setValue', () => {
    it('should change the value', () => {
      const expectedValue = 'other value';
      service.setValue(expectedValue);
      const rta = service.getValue();
      expect(rta).toBe(expectedValue);
    });
  });

  describe('Test for getPromiseValue', () => {
    it('should get the promise value using then', (doneFn) => {
      const expectedValue = 'Promise - value';
      service.getPromise().then((value) => {
        expect(value).toBe(expectedValue);
        doneFn();
      });
    });

    it('should get the promise value using async await', async () => {
      const expectedValue = 'Promise - value';
      const rta = await service.getPromise();
      expect(rta).toBe(expectedValue);
    });
  });

  describe('Test for getObservableValue using done', () => {
    it('Should get the observer value', (done) => {
      const expectedValue = 'Observable - value';
      service.getObservable().subscribe((value) => {
        expect(value).toBe(expectedValue);
        done();
      });
    });

    it('Should get the observer value toPromise', async () => {
      const expectedValue = 'Observable - value';
      const value = await service.getObservable().toPromise();
      expect(value).toBe(expectedValue);
    });
  });
});
