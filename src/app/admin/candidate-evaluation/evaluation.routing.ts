import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { QuestionsComponent } from './questions/questions.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { EvaluationResolver } from '../../services/candidate-evaluation.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
        resolve: {
            data: EvaluationResolver,
        }
    },
    {
        path: 'introduction',
        component: IntroductionComponent,
        resolve: {
            data: EvaluationResolver,
        }
    },
    {
        path: 'questions',
        component: QuestionsComponent,
        resolve: {
            data: EvaluationResolver,
        }
    },
    {
        path: 'feedback',
        component: FeedbackComponent,
        resolve: {
            data: EvaluationResolver,
        }
    },
    {
        path: 'recommendations',
        component: RecommendationsComponent,
        resolve: {
            data: EvaluationResolver,
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EvaluationRoutingModule { }
