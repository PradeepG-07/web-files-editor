import { Component } from '@angular/core';
import {ItemsViewType} from '../../../../core/enums';
import { CommonModule, Location, NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    NgClass,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  ItemsViewType = ItemsViewType;
  viewType: ItemsViewType;
  isSearchActive: boolean;
  searchText: string | null;

  constructor(private location: Location){
    this.viewType = ItemsViewType.GRID;
    this.isSearchActive = false;
    this.searchText = null;
  }
  goBack(){
    this.location.back();
  }
  goForward(){
    this.location.forward();
  }
  toggleSearchActivation(){
    this.isSearchActive = !this.isSearchActive;
  }
}
