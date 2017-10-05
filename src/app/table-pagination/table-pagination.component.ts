import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from "../commons"
import * as Rx from "rxjs/Rx";

@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit, OnChanges {

    @Input() table: Table<any>;
    @Input() page: PaginationPage<any>;

    pagesIndexes: Array<number> = [];
    firstPage: number;
    lastPage: number;

    ngOnInit() {

    }

    ngOnChanges(changes) {
        let pagesIndexes_: Array<number> = [];



        if (this.page.totalPages > 20) {
            if (this.page.number < 10) {
                this.firstPage = 0;
                this.lastPage = 20;
            }
            else if (this.page.number > (this.page.totalPages - 10)) {
                this.firstPage = this.page.totalPages - 20;
                this.lastPage = this.page.totalPages;
            }
            else {
                this.firstPage = this.page.number - 10;
                this.lastPage = this.page.number + 10;
            }
        }
        else {
            this.firstPage = 0;
            this.lastPage = this.page.totalPages;
        }

        for (let i = this.firstPage; i < this.lastPage; i++) {
            pagesIndexes_.push(i + 1);
        }
        this.pagesIndexes = pagesIndexes_;
    }

    fetchPageNumber(pageNumer: number) {
        let observable: Rx.Observable<any> = this.table.fetchPage(pageNumer - 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchPageSize(pageSize: number) {
        let observable: Rx.Observable<any> = this.table.fetchPage(this.page.number, pageSize, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchNextPage() {
        if (this.page.number + 1 >= this.page.totalPages) {
            return;
        }

        let observable: Rx.Observable<any> = this.table.fetchPage(this.page.number + 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchPreviousPage() {
        if (this.page.number == 0) {
            return;
        }

        let observable: Rx.Observable<any> = this.table.fetchPage(this.page.number - 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    private getSort(): PaginationPropertySort {
        if (this.page.sort != null && this.page.sort.length > 0) {
            return this.page.sort[0];
        } else {
            return null;
        }
    }
}
