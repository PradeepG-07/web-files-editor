import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor-v2';
@Component({
  selector: 'app-monaco-editor',
  template: `
   <ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
  `,
  imports: [
    EditorComponent,
    FormsModule
  ]
})
export class MonacoEditorComponent{
  @Input() code: string = 'console.log("hello';
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
}
