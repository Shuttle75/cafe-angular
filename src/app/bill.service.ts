import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

import { Bill, BillItem } from './bill'
import { PaginationPage, PaginationPropertySort } from './pagination';
import { webServiceEndpoint } from './commons';

@Injectable()
export class BillService implements Resolve<Bill> {

    constructor(private http: Http) {}

    getBills(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Bill>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/bills`, options)
            .map((response: Response) => <PaginationPage<Bill>> response.json())
            .publish()
            .refCount();
    }

    getBill(id: number): Rx.Observable<Bill> {
        return this.http.get(`${webServiceEndpoint}/bills/${id}`)
            .map((response: Response) => <Bill> response.json())
            .catch(this.handleError);
    }
    
    resolve(route: ActivatedRouteSnapshot): Rx.Observable<Bill> {
        return this.getBill(route.params.id);
    }

    addBill(bill: Bill): Rx.Observable<Bill> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.post(`${webServiceEndpoint}/bills`, JSON.stringify(bill), {headers})
            .map((response: Response) => <Bill> response.json())
            .catch(this.handleError);
    }

    deleteBill(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/bills/${id}`)
            .map((response: Response) => <Bill> response.json())
            .catch(this.handleError);
    }
    
    getBillItemsByBill(id: number): Rx.Observable<BillItem[]> {
        return this.http.get(`${webServiceEndpoint}/billItems/${id}/bill`)
            .map((response: Response) => <BillItem[]> response.json())
            .catch(this.handleError);
    }

    addBillItem(billItem: BillItem): Rx.Observable<BillItem> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.post(`${webServiceEndpoint}/billItems`, JSON.stringify(billItem), {headers})
            .map((response: Response) => <BillItem> response.json())
            .catch(this.handleError);
    }

    deleteBillItem(id: number): Rx.Observable<BillItem> {
        return this.http.delete(`${webServiceEndpoint}/billItems/${id}`)
            .map((response: Response) => <BillItem> response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.log(error);
        console.log('handleError log:');
        let errMsg: string;
        if (error instanceof Response) {
            if (!(error.text() === '' )) {  // if response body not empty
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                console.log('binding errors header not empty');
                errMsg = error.headers.get('errors').toString();
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx.Observable.throw(errMsg);
    }
}
