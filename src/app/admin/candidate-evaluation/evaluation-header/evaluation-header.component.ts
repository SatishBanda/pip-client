import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap";
import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'evaluation-header',
    templateUrl: './evaluation-header.component.html',
    styleUrls: ['./evaluation-header.component.css'],    
    encapsulation: ViewEncapsulation.None,
})
export class EvaluationHeaderComponent implements OnInit {
    companyData: {

    };
    candidate: string;
    constructor(public route: ActivatedRoute,
        public router: Router,
        private _globalService: GlobalService) {
        this.candidate = route.snapshot.params['candidate'];
    }

    ngOnInit() {
    }
}

