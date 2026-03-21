import { Component } from '@angular/core';
import { NavbarComponent } from '../../features/file-manager/components/navbar/navbar.component';
import { FooterComponent } from '../../features/file-manager/components/footer/footer.component';
import { FileListComponent } from '../../features/file-manager/components/file-list/file-list.component';
import { SidebarComponent } from '../../features/file-manager/components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../features/file-manager/components/toolbar/toolbar.component';

@Component({
  selector: 'app-file-manager',
  imports: [
    NavbarComponent,
    SidebarComponent,
    ToolbarComponent,
    FileListComponent,
    FooterComponent
  ],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.css'
})
export class FileManagerComponent {

}
