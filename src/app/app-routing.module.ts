import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OthersComponent } from './components/others/others.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { AuthGuard } from './guards/auth.guard.';

export const routes: Routes = [
  {
    path: 'pico-preview',
    component: PicoPreviewComponent,
  },
  {
    path: 'people',
    component: PersonListComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'others',
    canActivate: [AuthGuard],
    component: OthersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
