import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MatSortModule, MatTableModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {BillListComponent} from './bill/bill-list/bill-list.component';
import {BillEditComponent} from './bill/bill-edit/bill-edit.component';
import {TableSortComponent} from './table-sort/table-sort.component';
import {CafePlanComponent} from './cafe-plan/cafe-plan.component';
import {MenuGroupComponent} from './menu/menu-group/menu-group.component';
import {MenuItemComponent} from './menu/menu-item/menu-item.component';

import {BillService} from './bill/bill.service';
import {MenuService} from './menu/menu.service';
import {PartService} from './part.service';
import {HttpErrorHandler} from './error.service';


const appRoutes: Routes = [
    {path: '', component: BillListComponent},
    {path: 'plan', component: CafePlanComponent},
    {path: 'bills', component: BillListComponent},
    {path: 'bills/:id', component: BillEditComponent, resolve: {bill: BillService}}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    declarations: [
        AppComponent,
        BillListComponent,
        BillEditComponent,
        TableSortComponent,
        CafePlanComponent,
        MenuGroupComponent,
        MenuItemComponent
    ],
    providers: [
        BillService,
        MenuService,
        PartService,
        HttpErrorHandler
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
