import {Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Bill, BillItem} from './bill';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {HandleError} from '../error.service';
import {PaginationPage} from '../pagination';


@Injectable()
export class BillService {

  private entity_url = environment.REST_API_URL;
  private handleError: HandleError;

  constructor(private http: HttpClient) {
  }

  getBills(page: number, pageSize: number, sort: String): Observable<PaginationPage<Bill>> {

      const params = new HttpParams()
      .set('size', pageSize.toString())
      .set('page', page.toString());

      if (sort != null) {
          params.append('sort', String(sort));
      }

      return this.http.get<PaginationPage<Bill>>(this.entity_url + 'bills', {params})
          .pipe(
              catchError(err =>  this.handleError(err))
          );
    }

    getBill(id: number): Observable<Bill> {
        return this.http.get<Bill>(this.entity_url + 'bills/' + id)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    addBill(bill: Bill): Observable<Bill> {
        return this.http.post<Bill>(this.entity_url + 'bills', bill)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    deleteBill(id: number): Observable<{}> {
        return this.http.delete<Bill>(this.entity_url + 'bills/' + id)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    getBillItemsByBill(id: number): Observable<BillItem[]> {
        return this.http.get<BillItem[]>(this.entity_url + 'billItems/' + id + '/bill')
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    addBillItem(billItem: BillItem): Observable<BillItem> {
        return this.http.post<BillItem>(this.entity_url + '/billItems', billItem)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    deleteBillItem(id: number): Observable<{}> {
        return this.http.delete(this.entity_url + 'billItems/' + id)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }
}
