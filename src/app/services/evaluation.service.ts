import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp, JwtHelper } from 'angular2-jwt';


import { GlobalService } from './global.service';
import { HttpService } from '../interceptors/http.service';

@Injectable()

export class EvaluationService {

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/evaluation';

    public introductionRating: any = 0;
    public questionsRating: any = 0;
    public recommendationsRating: any = 0;
    public feedbackRating: any = 0;

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: HttpService) {
    }
    /**
     * 
     * @param company_id 
     */
    public companyStatusChange(company_id): Observable<any> {
        return this._http.put(
            this._apiUrl + '/change-company-status/' + company_id,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    /**
     * 
     */
    public getQuestionLabels(data): Observable<any> {
        return this._http.post(
            this._apiUrl + '/get-candidate-evaluation', data,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json().data)
            .catch(this._globalService.handleError);
    }

    public saveSettings(data): Observable<any> {
        return this._http.post(
            this._apiUrl + '/save-settings', data,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json().data)
            .catch(this._globalService.handleError);
    }

    public saveEvaluation(data): Observable<any> {
        return this._http.post(
            this._apiUrl + '/save-evaluations', data,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json().data)
            .catch(this._globalService.handleError);
    }

    public validateQuestions(questions): any {
        let questionStatus = true;
        questions.forEach(element => {
            if (element.questionValue == 0) {
                questionStatus = false;
                return false;
            }
        });
        return true;
    }

    public calculateOverAllRating(data) {

        let intro = data.subcategories_1;

        let sum = 0;
        intro.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        this.introductionRating = (sum / intro.length).toFixed(2);

        let ques1 = data.subcategories_2;
        let ques2 = data.subcategories_3;
        let ques3 = data.subcategories_4;
        let ques4 = data.subcategories_5;
        let ques5 = data.subcategories_6;
        let ques6 = data.subcategories_7;
        let ques7 = data.subcategories_8;

        sum = 0;
        ques1.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        ques2.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        ques3.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        ques4.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        ques5.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        ques6.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        ques7.forEach(element => {
            sum += parseInt(element.questionValue);
        });

        this.questionsRating = (sum / (ques1.length * 7)).toFixed(2);


        let recom = data.subcategories_9;

        sum = 0;
        recom.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        this.recommendationsRating = (sum / recom.length).toFixed(2);

        let feedback1 = data.subcategories_10;
        let feedback2 = data.subcategories_11;
        let feedback3 = data.subcategories_12;

        sum = 0;
        feedback1.forEach(element => {
            sum += parseInt(element.questionValue);
        });

        feedback2.forEach(element => {
            sum += parseInt(element.questionValue);
        });

        feedback3.forEach(element => {
            sum += parseInt(element.questionValue);
        });
        let length = feedback1.length + parseInt(feedback2.length) + parseInt(feedback3.length);
        this.feedbackRating = (sum / length).toFixed(2);

    }
}


