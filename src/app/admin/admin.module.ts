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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, RatingModule } from 'ngx-bootstrap';
import { EvaluationComponent } from './evaluation/evaluation.component';

import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";
import { PartialViews } from '../_partial-views/partial-views.module';

import { TabsModule } from 'ngx-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { EvaluationService } from '../services/evaluation.service';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    PartialViews,
    TabsModule.forRoot(),
    FormsModule,
    NouisliderModule,
    RatingModule
    //ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    DashboardComponent,
    CandidatesComponent,
    StaffComponent,
    SettingsComponent,
    HighchartsChartComponent,
    EvaluationComponent
  ],
  providers: [EvaluationService],
  
})
export class AdminModule { }
