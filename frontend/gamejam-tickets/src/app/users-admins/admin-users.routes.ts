import { RouterModule, Routes } from '@angular/router';
import { CreateSupportsComponent } from './create-supports/create-supports.component';

export const ADMIN_USERS: Routes = [
  { path: 'create-support', component: CreateSupportsComponent },
];

export const AppRoutingModule = RouterModule.forRoot(ADMIN_USERS);