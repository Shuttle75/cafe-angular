import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

import {CafeTable} from './cafe-table'
import {Waiter} from './waiter'
import {webServiceEndpoint} from './commons';

@Injectable()
export class PartService {

    constructor(private http: Http) {}

    findCafeTables(): Rx.Observable<CafeTable[]> {
        return this.http.get(`${webServiceEndpoint}/cafe-tables`)
            .map((response: Response) => <CafeTable[]> response.json())
            .publish().refCount();
    }

    getCafeTable(id: number): Rx.Observable<CafeTable> {
        return this.http.get(`${webServiceEndpoint}/cafe-tables/${id}`)
            .map((response: Response) => <CafeTable> response.json())
            .publish()
            .refCount();
    }

    findWaiters(): Rx.Observable<Waiter[]> {
        return this.http.get(`${webServiceEndpoint}/waiters`)
            .map((response: Response) => <Waiter[]> response.json())
            .publish()
            .refCount();
    }

    getWaiter(id: number): Rx.Observable<Waiter> {
        return this.http.get(`${webServiceEndpoint}/waiters/${id}`)
            .map((response: Response) => <Waiter> response.json())
            .publish()
            .refCount();
    }
}
