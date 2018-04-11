import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { StaffComponent } from './staff/staff.component';
import { EvaluationComponent } from './evaluation/evaluation.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'candidates',
        component: CandidatesComponent
    },
    {
        path: 'staff',
        component: StaffComponent
    },
    {
        path: 'evaluation',
        component: EvaluationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
