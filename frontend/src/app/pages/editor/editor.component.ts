import { Component } from '@angular/core';
import { NavbarComponent } from '../../features/editor/components/navbar/navbar.component';
import { FooterComponent } from '../../features/editor/components/footer/footer.component';
import { MonacoEditorComponent } from '../../features/editor/components/monaco-editor/monaco-editor.component';
import { SidebarComponent } from '../../features/editor/components/sidebar/sidebar.component';

@Component({
  selector: 'app-editor',
  imports: [NavbarComponent,FooterComponent,MonacoEditorComponent,SidebarComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {

}
