import { CafeTable } from '../cafe-table';
import { Waiter } from '../waiter';
import { MenuItem } from '../menu/menu';

export interface Bill {
    id: number;
    cafeTable: CafeTable;
    waiter: Waiter;
    openDate: string;
    closeDate: string;
    persons: number;
    discountPercent: number;
    discountAmount: number;
    billAmount: number;
    wholeAmount: number;
    paymentType: number;
    transactNumber: string;
    billItems: BillItem[];
}

export interface BillItem {
    id: number;
    bill: Bill;
    menuItem: MenuItem;
    orderDate: string;
    price: number;
}
