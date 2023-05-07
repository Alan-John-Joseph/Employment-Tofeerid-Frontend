import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './emp-list/emp-list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './emp-details/emp-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee', component: HomeComponent },
  { path: 'employee/:id', component: ViewComponent },
  { path: 'employee/:id/edit', component: AddComponent },
  { path: 'add', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
