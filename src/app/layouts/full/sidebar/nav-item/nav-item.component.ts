import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from './nav-item';
import { NavService } from '../../../../services/nav.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: []
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any;
  @Input() depth: any;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // Handle the case for multiple routes activating the same menu item
        if (this.item.route === '/bank/compte') {
          this.item.isActive = this.router.isActive('/bank/compte', true) ||
                               this.router.isActive('/bank/banksearch', true) ||
                               this.router.isActive('/bank/operation', true);
        } else if (this.item.route === '/bank/virement') {
          this.item.isActive = this.router.isActive('/bank/virement', true) ||
                               this.router.isActive('/bank/virement-plusieurs', true) ||
                               this.router.isActive('/bank/virement-permanent', true);
        } else {
          this.item.isActive = this.router.isActive(this.item.route, true);
        }

        // Additional condition to show Admin or Banque based on URL
        if (url.startsWith('/admin') || url.startsWith('/bank/admin')) {
          this.item.visible = this.item.navCap === 'Admin' || this.item.route?.startsWith('/admin') || this.item.route?.startsWith('/bank/admin');
        } else {
          this.item.visible = this.item.navCap === 'Banque' || this.item.route?.startsWith('/bank/bourse') || this.item.route?.startsWith('/bank/virement') || this.item.route?.startsWith('/bank/credit') || this.item.route?.startsWith('/bank/demande') || this.item.route?.startsWith('/bank/compte') ;
        }
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
}
