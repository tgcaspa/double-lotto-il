import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class LayoutSidebarComponent implements OnInit {

    isCollapsed:boolean = true;

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.isCollapsed = true;
            }
        });
    }

    ngOnInit() {
    }

}
