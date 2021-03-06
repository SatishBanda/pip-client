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

export class SettingService {

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/settings';

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
    public getSettings(): Observable<any> {
        return this._http.get(
            this._apiUrl + '/get-settings',
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json().data)
            .catch(this._globalService.handleError);
    }

    public saveSettings(data): Observable<any> {
        return this._http.post(
            this._apiUrl + '/save-settings',data,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json().data)
            .catch(this._globalService.handleError);
    }
}


