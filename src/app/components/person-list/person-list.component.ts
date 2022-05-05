import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  person: Person = new Person('Armando', 'Rivera', 24, 80, 180);
  constructor() {}

  ngOnInit(): void {}
}
