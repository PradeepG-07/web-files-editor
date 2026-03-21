import { Component, OnInit } from '@angular/core';
import { Tree } from '../../../../core/models/index.model';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  fileTree: Tree | null;
  constructor () {
    this.fileTree  = null;
  }
  ngOnInit(): void {
      
  }
}
