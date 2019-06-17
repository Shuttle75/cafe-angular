import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService} from '../bill/bill.service';
import { PartService} from '../part.service';
import { CafeTable} from '../cafe-table';
import { Bill} from '../bill/bill';
import { Waiter} from '../waiter';

@Component({
    selector: 'app-cafe-plan',
    templateUrl: './cafe-plan.component.html',
    styleUrls: ['./cafe-plan.component.css']
})
export class CafePlanComponent implements OnInit {

    tables: CafeTable[] = [];
    bill: Bill;
    currentCafeTable: CafeTable;
    currentWaiter: Waiter;
    errorMessage: string;

    constructor(private billService: BillService, private partService: PartService, private router: Router) {
        this.currentCafeTable = <CafeTable>{};
        this.currentWaiter = <Waiter>{};
        this.bill = <Bill>{};
    }

    ngOnInit() {
        this.fetchPage();
    }

    fetchPage() {
        this.partService.findCafeTables()
          .subscribe(tables => this.tables = tables);
    }

    goToDetails(id: number) {
        this.partService.getCafeTable(id)
            .subscribe(
                response => this.currentCafeTable = response,
                error => this.errorMessage = <any> error,
                () => {
                    this.bill.cafeTable = this.currentCafeTable;
                    const waiterId = 5;
                    this.partService.getWaiter(waiterId)
                        .subscribe(
                            response => this.currentWaiter = response,
                            error => this.errorMessage = <any> error,
                            () => {
                                this.bill.waiter = this.currentWaiter;
                                this.bill.persons = 2;
                                this.billService.addBill(this.bill)
                                    .subscribe(
                                        newBill => this.bill = newBill,
                                        error => this.errorMessage = <any> error,
                                        () => this.router.navigate(['/bills', this.bill.id])
                                    );
                            }
                        );
                }
            );
    }
}
