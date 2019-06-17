import {Component, OnInit, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {PaginationPage} from '../../pagination';
import {Table} from './table';
import {BillService} from '../bill.service';
import {Bill} from '../bill';

@Component({
    selector: 'app-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
    errorMessage: string;
    length = 100;
    pageIndex = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    billPage: PaginationPage<Bill>;
    dataSource: Bill[];
    self: Table<Bill>;
    displayedColumns: string[] = [
      'cafeTable',
      'waiter',
      'openDate',
      'closeDate',
      'persons',
      'discountPercent',
      'discountAmount',
      'billAmount',
      'wholeAmount',
      'details'];

    constructor(private billService: BillService, private router: Router) {}

    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      this.fetchPage(this.pageIndex, this.pageSize, this.sort);
    }

    doPageEvent(event: PageEvent) {
      this.fetchPage(event.pageIndex, event.pageSize, this.sort);
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }

    fetchPage(page: number, size: number, sort: MatSort) {
        this.billService.getBills(page, size, sort)
          .subscribe(
            billPage => {this.billPage = billPage; this.dataSource = billPage.content;
            });
    }

    goToDetails(bill) {
        this.router.navigate(['bills', bill.id]);
    }

    delete(bill) {
      this.billService.deleteBill(bill.id.toString()).subscribe(
        response => {
          this.billService.getBills(this.pageIndex, this.pageSize, this.sort).subscribe(
            respbills => this.billPage = respbills,
            error => this.errorMessage = <any> error
          );
        },
        error => this.errorMessage = <any> error);
    }

    sortData() {
      this.fetchPage(this.pageIndex, this.pageSize, this.sort);
    }
}
