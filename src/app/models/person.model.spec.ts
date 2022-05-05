import { Person } from './person.model';

fdescribe('Test for Person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Armando', 'Rivera', 24, 80, 180);
  });

  it('should set attrs', () => {
    expect(person.name).toEqual('Armando');
    expect(person.lastName).toEqual('Rivera');
    expect(person.age).toEqual(24);
  });

  describe('test for calc IMC', () => {
    it('should return a string: down', () => {
      // Arrange
      person.weigth = 40;
      person.weigth = 1.65;

      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('down');
    });
  });
});
