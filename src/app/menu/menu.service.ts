import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MenuGroup, MenuItem } from './menu';
import {environment} from '../../environments/environment';
import {HandleError} from '../error.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MenuService {

  private entity_url = environment.REST_API_URL;
  private handleError: HandleError;

    constructor(private http: HttpClient) {}

    getMenuGroups(): Observable<MenuGroup[]> {
        return this.http.get<MenuGroup[]>(this.entity_url + 'menu-groups')
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    getMenuGroupById(id: number): Observable<MenuGroup> {
        return this.http.get<MenuGroup>(this.entity_url + 'menu-groups/${id}')
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    getMenuItems(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.entity_url + 'menu-items')
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    getMenuItemsByMenuGroup(id: number): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.entity_url + 'menu-items/' + id + '/menu-group')
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    getMenuItemsById(id: number): Observable<MenuItem> {
        return this.http.get<MenuItem>(this.entity_url + 'menu-items/' + id)
          .pipe(
            catchError(err =>  this.handleError(err))
          );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
