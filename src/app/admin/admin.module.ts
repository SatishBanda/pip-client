import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin.routing';
import { CandidatesComponent } from './candidates/candidates.component';
import { StaffComponent } from './staff/staff.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { DataTableModule } from "angular2-datatable";
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { EvaluationComponent } from './evaluation/evaluation.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule
    //ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    DashboardComponent,
    CandidatesComponent,
    StaffComponent,
    SettingsComponent,
    HighchartsChartComponent,
    EvaluationComponent
  ]
})
export class AdminModule { }
