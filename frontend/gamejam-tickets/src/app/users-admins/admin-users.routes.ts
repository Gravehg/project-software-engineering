import { RouterModule, Routes } from '@angular/router';
import { CreateSupportsComponent } from './create-supports/create-supports.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { UsersComponent } from './users/users.component';

export const ADMIN_USERS: Routes = [
  { path: 'create-support', component: CreateSupportsComponent },
    { path: 'admin-pool', component: NotFoundComponent },
  { path: 'user-pool', component: UsersComponent },
];

export const AppRoutingModule = RouterModule.forRoot(ADMIN_USERS);