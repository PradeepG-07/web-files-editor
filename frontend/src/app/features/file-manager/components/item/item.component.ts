import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../../core/models/index.model';
@Component({
  selector: 'app-item',
  imports: [
    NgIf
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent{
  @Input() item:Item;
  constructor() {
    this.item = {
      name: "/",
      size: 244,
      absolutePath:"/",
      isDirectory: true
    }
  }
  handleClick(e: MouseEvent){
    console.log(e);
    console.log(this.item);
    
  }
  handleRightClick(e: MouseEvent){
    console.log(e);
    e.preventDefault(); 
  }
}
