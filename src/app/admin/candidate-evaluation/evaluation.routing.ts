import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { QuestionsComponent } from './questions/questions.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full'
    },
    {
        path: 'introduction',
        component: IntroductionComponent
    },
    {
        path: 'questions',
        component: QuestionsComponent
    },
    {
        path: 'feedback',
        component: FeedbackComponent
    },
    {
        path: 'recommendations',
        component: RecommendationsComponent
    },
   /* {
        path: ':candidate/evaluation',
        loadChildren: 'app/admin/evaluation/evaluation.module#EvaluationModule',
        data: {preload: true}
    },*/

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EvaluationRoutingModule { }
