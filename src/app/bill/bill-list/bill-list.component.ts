import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PaginationPage, PaginationPropertySort} from '../../pagination';
import {Table} from '../../table';
import {BillService} from '../bill.service';
import {Bill} from '../bill';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
    errorMessage: string;

    billPage: PaginationPage<Bill>;
    self: Table<Bill>;

    constructor(private billService: BillService, private router: Router) {}

    ngOnInit() {
      this.fetchPage(0, 10, null);
    }

  fetchPage(page: number, size: number, sort: String): Observable<PaginationPage<Bill>> {
    const observable: Observable<PaginationPage<Bill>> = this.billService.getBills(page, size, sort);
    observable.subscribe(billPage => this.billPage = billPage);
    return observable;
  }

    goToDetails(bill) {
        this.router.navigate(['bills', bill.id]);
    }

    delete(bill) {

        // let observable: Observable<Response> = this.billService.deleteBill(bill.id);
        // showLoading();
        // observable.switchMap(() => {
        //     return this.fetchPage(0, 12, null);
        // }).subscribe(doNothing, hideLoading, hideLoading);
    }
}
