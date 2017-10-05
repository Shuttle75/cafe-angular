import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

import { webServiceEndpoint } from './commons';
import { MenuGroup, MenuItem } from "./menu";

@Injectable()
export class MenuService {

    constructor(private http: Http) {}

    getMenuGroups(): Rx.Observable<MenuGroup[]> {
        return this.http.get(`${webServiceEndpoint}/menu-groups`).map(this.extractData).publish().refCount();
    }

    getMenuGroupById(id: number): Rx.Observable<MenuGroup> {
        return this.http.get(`${webServiceEndpoint}/menu-groups/${id}`).map(this.extractData).publish().refCount();
    }

    getMenuItems(): Rx.Observable<MenuItem[]> {
        return this.http.get(`${webServiceEndpoint}/menu-items`).map(this.extractData).publish().refCount();
    }

    getMenuItemsByMenuGroup(id: number): Rx.Observable<MenuItem[]> {
        return this.http.get(`${webServiceEndpoint}/menu-items/${id}/menu-group`).map(this.extractData).publish().refCount();
    }

    getMenuItemsById(id: number): Rx.Observable<MenuItem> {
        return this.http.get(`${webServiceEndpoint}/menu-items/${id}`).map(this.extractData).publish().refCount();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
