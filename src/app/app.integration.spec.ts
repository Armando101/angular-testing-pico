import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-pico-preview',
})
class ProductsComponent {}

@Component({
  selector: 'app-person-list',
})
class PersonListComponent {}

@Component({
  selector: 'app-others',
})
class OthersComponent {}

const routes = [
  {
    path: 'pico-preview',
    component: ProductsComponent,
  },
  {
    path: 'people',
    component: PersonListComponent,
  },
  {
    path: 'others',
    component: OthersComponent,
  },
];

fdescribe('App integration test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        ProductsComponent,
        PersonListComponent,
        OthersComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // providers
    router = TestBed.inject(Router);
    router.initialNavigation();

    tick(); // Wait untill navigation
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
