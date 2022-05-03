import { Calculator } from './calculator';

describe('calculator', () => {
  const calculator = new Calculator();

  it('should multiply', () => {
    const expectedValue = 9;
    const rta = calculator.multiply(3, 3);
    expect(rta).toBe(expectedValue);
  });

  it('should return null value', () => {
    const rta = calculator.divide(3, 0);
    expect(rta).toBeNull();
  });

  it('should divide', () => {
    const expectedValue = 1;
    const rta = calculator.divide(3, 3);
    expect(rta).toBe(expectedValue);
  });

  it('test matchers', () => {
    let name = 'Armando';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();
    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();
    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);
    expect('123456').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });
});
