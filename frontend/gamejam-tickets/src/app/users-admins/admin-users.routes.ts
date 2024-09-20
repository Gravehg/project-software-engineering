import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { UsersComponent } from './users/users.component';

export const ADMINS_USERS: Routes = [
  { path: 'admin-pool', component: NotFoundComponent },
  { path: 'user-pool', component: UsersComponent },
];

export const AppRoutingModule = RouterModule.forRoot(ADMINS_USERS);
