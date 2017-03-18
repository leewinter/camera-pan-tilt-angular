// Vendor dependencies
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CameraService {
    constructor(private http: Http) {

    }

    get(url: string, options?: URLSearchParams): Observable<any> {
        return this.http.get(url, { search: options });
    }

    post(url: string, body): Observable<any> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let requestOptions = new RequestOptions({ headers: headers }); 

        return this.http.post(url, body, requestOptions);
    }
}