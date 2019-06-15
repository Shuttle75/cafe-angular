import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../menu.service';
import { MenuGroup, MenuItem } from '../menu';


@Component({
  selector: 'app-menu-group',
  templateUrl: './menu-group.component.html',
  styleUrls: ['./menu-group.component.css']
})
export class MenuGroupComponent implements OnInit {

    @Input() menu_item_id: number;

    menu_groups: MenuGroup[];
    menu_items: MenuItem[];
    error_message: string;


    constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.menuService.getMenuGroups().subscribe(
            response => this.menu_groups = response,
            error => this.error_message = <any> error
        );
    }

    goToDetails(group: MenuGroup) {
        this.menuService.getMenuItemsByMenuGroup(group.id).subscribe(
            response => this.menu_items = response,
            error => this.error_message = <any> error
        );
    }

}
