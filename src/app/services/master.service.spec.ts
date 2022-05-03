import { MasterService } from './master.service';
import { FakeValueService } from './value-fake.service';
import { ValueService } from './value.service';

fdescribe('MasterService', () => {
  it('should return "my value" from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "other value" from fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(
      fakeValueService as unknown as ValueService
    );
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "other value" from fake object', () => {
    const value = 'fake from obj';
    const fakeValueService = { getValue: () => value };
    const masterService = new MasterService(
      fakeValueService as unknown as ValueService
    );
    expect(masterService.getValue()).toBe(value);
  });

  it('should call getValue from value service', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    const masterService = new MasterService(valueServiceSpy);

    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
