export enum IMC_TYPES {
  'Not found',
  'down',
  'normal',
  'overweigth',
  'overweigth level 1',
  'overweigth level 2',
  'overweigth level 3',
}

export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weigth: number,
    public heigth: number
  ) {}

  calcIMC(): string {
    const result = Math.round(this.weigth / (this.heigth * this.heigth));
    if (result < 0) {
      return 'Not found';
    }
    if (result < 19) {
      return 'down';
    }
    if (result < 25) {
      return 'normal';
    }
    if (result < 27) {
      return 'overweigth';
    }
    if (result < 30) {
      return 'overweigth level 1';
    }
    if (result < 40) {
      return 'overweigth level 2';
    }
    return 'overweigth level 3';
  }
}
