import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  imports: [
    CommonModule,
    MonacoEditorModule.forRoot(),
  ],
  declarations: [],
})
export class EditorModule {}
