import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardUsersComponent } from './dashboard-users/dashboard-users.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersOesComponent } from './users-oes/users-oes.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard-users', pathMatch: 'full' },
  { path: 'dashboard-users', component: DashboardUsersComponent },
  { path: 'users-details/:id', component: UsersDetailsComponent },
  { path: 'users-oes', component: UsersOesComponent }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
