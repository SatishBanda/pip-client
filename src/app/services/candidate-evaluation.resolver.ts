import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from './global.service';
import { EvaluationService } from './evaluation.service';

@Injectable()
export class EvaluationResolver implements Resolve<any> {
    encodedId: any;
    company_id: any;
    candidate: any;

    constructor(
        private globalService: GlobalService,
        private toasterService: ToastrService,
        private evaluationService: EvaluationService,
        private router: Router,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.candidate = this.globalService.decode(route.params['candidate']);
        let data = {
            "candidateId": this.candidate,
            "evaluationType": "start"
        }
        return this.evaluationService.getQuestionLabels(data);
    }

}