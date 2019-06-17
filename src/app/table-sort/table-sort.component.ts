import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {PaginationPage} from '../pagination';
import {Table} from '../bill/bill-list/table';
import {showLoading, hideLoading, doNothing} from '../commons';


@Component({
    selector: 'app-table-sort',
    templateUrl: './table-sort.component.html',
    styleUrls: ['./table-sort.component.css']
})
export class TableSortComponent implements OnInit, OnChanges {

    @Input() label: string;
    @Input() property: string;
    @Input() table: Table<any>;
    @Input() page: PaginationPage<any>;

    sortDirection: string;
    sortClass: boolean = false;
    sortAscClass: boolean = false;
    sortDescClass: boolean = false;

    ngOnInit() {

    }

    ngOnChanges(changes) {

        // if (changes['page']) {
        //
        //     var defineValues = (s, sa, sd, dir) => {
        //         this.sortClass = s;
        //         this.sortAscClass = sa;
        //         this.sortDescClass = sd;
        //         this.sortDirection = dir;
        //     };
        //
        //     if (this.page.sort == null) {
        //         defineValues(true, false, false, 'ASC');
        //         return;
        //     }
        //     const one = 'sort=';
        //
        //     if (one == null) {
        //         defineValues(true, false, false, 'ASC');
        //     } else {
        //         if (one.direction === 'ASC') {
        //             defineValues(false, true, false, 'DESC');
        //         } else {
        //             defineValues(false, false, true, 'ASC');
        //         }
        //     }
        // }
    }

    sortByProperty() {

        const sort: string = 'sort=' + this.property + ',' + this.sortDirection;

        let pageNumber = this.page.number - 1;
        if (pageNumber < 0) {
            pageNumber = 0;
        }

        showLoading();

        this.table.fetchPage(pageNumber, this.page.size, sort);
    }

}
