import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillEditComponent } from './bill-edit/bill-edit.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';
import { TableSortComponent } from './table-sort/table-sort.component';
import { CafePlanComponent } from './cafe-plan/cafe-plan.component';
import { MenuGroupComponent } from './menu-group/menu-group.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

import { BillService } from './bill.service'
import { MenuService } from './menu.service';
import { PartService } from './part.service'


const appRoutes: Routes = [
    {path: '', component: BillListComponent},
    {path: 'plan', component: CafePlanComponent},
    {path: 'bills', component: BillListComponent},
    {path: 'bills/add/:id/cafeTable', component: BillAddComponent},
    {path: 'bills/:id', component: BillEditComponent, resolve: {bill: BillService}}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        BillListComponent,
        BillEditComponent,
        TablePaginationComponent,
        TableSortComponent,
        MenuGroupComponent,
        MenuItemComponent
    ],
    providers: [
        BillService,
        MenuService,
        PartService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
