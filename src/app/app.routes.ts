import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageMedicineListComponent } from './manage-medicine-list/manage-medicine-list.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'manage-medicine-list', component: ManageMedicineListComponent },
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: DashboardComponent }

];
