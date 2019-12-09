export enum GROUP {
  leisure = 'Leisure',
  work = 'Work',
  personal = 'Personal'
}

export class Bookmark {
  constructor(
    public id: number,
    public name: string,
    public url: string,
    public group: GROUP
  ) {}
}
