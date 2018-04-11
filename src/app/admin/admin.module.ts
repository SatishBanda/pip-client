import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin.routing';
import { CandidatesComponent } from './candidates/candidates.component';
import { StaffComponent } from './staff/staff.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    //ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    DashboardComponent,
    CandidatesComponent,
    StaffComponent,
    SettingsComponent
  ]
})
export class AdminModule { }
