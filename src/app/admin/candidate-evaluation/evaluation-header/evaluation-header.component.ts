import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap";
import { GlobalService } from '../../../services/global.service';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
    selector: 'evaluation-header',
    templateUrl: './evaluation-header.component.html',
    styleUrls: ['./evaluation-header.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class EvaluationHeaderComponent implements OnInit {
    companyData: {

    };
    introStarsCount = 4;
    questionsStarsCount = 3;
    RecommendationStarsCount = 2;
    overallStarsCount = 1;

    candidate: string;
    constructor(public route: ActivatedRoute,
        public router: Router,
        private _globalService: GlobalService,
        public evalService: EvaluationService) {
        this.candidate = route.snapshot.params['candidate'];
    }

    ngOnInit() {
    }
}

