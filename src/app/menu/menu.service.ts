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
  private handlerError: HandleError;

    constructor(private http: HttpClient) {}

    getMenuGroups(): Observable<MenuGroup[]> {
        return this.http.get<MenuGroup[]>(this.entity_url + 'menu-groups')
          .pipe(
            catchError(this.handlerError('getMenuGroups', []))
          );
    }

    getMenuGroupById(id: number): Observable<MenuGroup> {
        return this.http.get<MenuGroup>(this.entity_url + 'menu-groups/${id}')
          .pipe(
            catchError(this.handlerError('getMenuGroupById', {} as MenuGroup))
          );
    }

    getMenuItems(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.entity_url + 'menu-items')
          .pipe(
            catchError(this.handlerError('getMenuItems', []))
          );
    }

    getMenuItemsByMenuGroup(id: number): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.entity_url + 'menu-items/${id}/menu-group')
          .pipe(
            catchError(this.handlerError('addOwner', []))
          );
    }

    getMenuItemsById(id: number): Observable<MenuItem> {
        return this.http.get<MenuItem>(this.entity_url + 'menu-items/' + id)
          .pipe(
            catchError(this.handlerError('addOwner', {} as MenuItem))
          );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
