import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs';

import { BillService} from '../bill.service';
import { MenuService} from '../../menu/menu.service';
import { Bill, BillItem } from '../bill';
import { MenuGroup, MenuItem } from '../../menu/menu';
import { showLoading, hideLoading, doNothing } from '../../commons'

@Component({
    selector: 'app-bill-edit',
    templateUrl: './bill-edit.component.html',
    styleUrls: ['./bill-edit.component.css']
})
export class BillEditComponent implements OnInit {
    bill: Bill;
    billItems: BillItem[];
    menuGroups: MenuGroup[];
    menuItems: MenuItem[];

    currentMenuItem: MenuItem;
    currentBillItem: BillItem;

    errorMessage: string;

    constructor(private billService: BillService, private menuService: MenuService,
                private route: ActivatedRoute, private router: Router) {
        this.bill = route.snapshot.data['bill'];
        this.currentMenuItem = <MenuItem>{};
        this.currentBillItem = <BillItem>{};
    }
    
    ngOnInit() {

        this.billService.getBillItemsByBill(this.bill.id)
            .subscribe(
                response => this.billItems = response,
                error => this.errorMessage = <any> error
            );
    }

    showMenuGroups() {
        this.menuService.getMenuGroups().subscribe(
            response => this.menuGroups = response,
            error => this.errorMessage = <any> error
        );
    }

    showMenuItems(menuGroup: MenuGroup) {
        this.menuService.getMenuItemsByMenuGroup(menuGroup.id).subscribe(
            response => this.menuItems = response,
            error => this.errorMessage = <any> error
        );
    }

    bindMenuItem(menuItem: MenuItem) {
        this.currentMenuItem = menuItem;
        this.menuGroups = null;
        this.menuItems = null;

        this.currentBillItem.id = null;
        this.currentBillItem.bill = this.bill;
        this.currentBillItem.menuItem = this.currentMenuItem;
        this.currentBillItem.price = this.currentMenuItem.price;
        this.billService.addBillItem(this.currentBillItem)
            .subscribe(
                newBillItem => this.currentBillItem = newBillItem,
                error => this.errorMessage = <any> error,
                () => this.fetchBillItems(this.bill.id)
        );
    }

    onSubmitBillItem(billItem: BillItem) {
        billItem.id = null;
        billItem.bill = this.bill;
        billItem.menuItem = this.currentMenuItem;
        billItem.price = this.currentMenuItem.price;
        this.billService.addBillItem(billItem).subscribe(
            () => {
                this.fetchBillItems(billItem.bill.id);
            },
            error => this.errorMessage = <any> error
        );
    }

    fetchBillItems(id: number): Observable<BillItem[]> {
         let observable: Observable<BillItem[]> = this.billService.getBillItemsByBill(id);
         observable.subscribe(billItems => this.billItems = billItems);
         return observable;
    }

    deleteBillItem(billItem) {
        let observable: Observable<{}> = this.billService.deleteBillItem(billItem.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchBillItems(billItem.bill.id);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }


    gotoBillsList() {
        this.router.navigate(['/plan']);
    }

}
