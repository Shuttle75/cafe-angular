import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from '../commons'
import {BillService} from '../bill.service';
import {Bill} from '../bill';


@Component({
    selector: 'app-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit, Table<Bill> {

    billPage: PaginationPage<Bill>;
    self: Table<Bill>;

    constructor(private billService: BillService, private router: Router) {}

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 12, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Bill>> {
        let observable: Rx.Observable<PaginationPage<Bill>> = this.billService.getBills(pageNumber, pageSize, sort);
        observable.subscribe(billPage => this.billPage = billPage);
        return observable;
    }

    goToDetails(bill) {
        this.router.navigate(['bills', bill.id]);
    }

    delete(bill) {

        let observable: Rx.Observable<Response> = this.billService.deleteBill(bill.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 12, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }
}
