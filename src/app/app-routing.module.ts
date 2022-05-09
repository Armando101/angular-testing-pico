import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OthersComponent } from './components/others/others.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'pico-preview',
    component: PicoPreviewComponent,
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
