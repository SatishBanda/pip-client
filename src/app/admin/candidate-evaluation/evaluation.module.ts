import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { DataTableModule } from "angular2-datatable";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, RatingModule } from 'ngx-bootstrap';
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";
import { TabsModule } from 'ngx-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { PartialViews } from '../../_partial-views/partial-views.module';
import { EvaluationRoutingModule } from './evaluation.routing';
import { IntroductionComponent } from './introduction/introduction.component';
import { EvaluationHeaderComponent } from './evaluation-header/evaluation-header.component';
import { QuestionsComponent } from './questions/questions.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { EvaluationService } from '../../services/evaluation.service';
import { EvaluationResolver } from '../../services/candidate-evaluation.resolver';
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    DataTableModule,
    ModalModule.forRoot(),
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    PartialViews,
    TabsModule.forRoot(),
    FormsModule,
    NouisliderModule,
    RatingModule,
    TinymceModule.withConfig({})
  ],
  declarations: [
    IntroductionComponent,EvaluationHeaderComponent,QuestionsComponent,FeedbackComponent,RecommendationsComponent
  ],
  providers: [EvaluationService,EvaluationResolver],
  exports:[EvaluationHeaderComponent,]
})
export class EvaluationModule { }
