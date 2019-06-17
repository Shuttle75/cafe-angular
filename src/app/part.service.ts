import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CafeTable} from './cafe-table';
import {Waiter} from './waiter';
import {environment} from '../environments/environment';
import {HandleError} from './error.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class PartService {

  private entity_url = environment.REST_API_URL;
  private handleError: HandleError;

    constructor(private http: HttpClient) {}

    findCafeTables(): Observable<CafeTable[]> {
        return this.http.get<CafeTable[]>(this.entity_url + 'cafe-tables')
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    getCafeTable(id: number): Observable<CafeTable> {
        return this.http.get<CafeTable>(this.entity_url + 'cafe-tables/' + id)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    findWaiters(): Observable<Waiter[]> {
        return this.http.get<Waiter[]>(this.entity_url + 'waiters')
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    getWaiter(id: number): Observable<Waiter> {
        return this.http.get<Waiter>(this.entity_url + 'waiters/' + id)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }
}
