import { Component } from '@angular/core';
import { ToolBarActions } from '../../../../core/enums';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  toolbarActions = ToolBarActions;
  onToolClick(e: MouseEvent){
    const targetElement = e.target as HTMLElement;
    const toolElement = targetElement.closest('button');
    if(toolElement == null) return;
    const toolAction = toolElement.dataset['toolAction'] as ToolBarActions;
    this.executeToolAction(toolAction);
  }
  executeToolAction(action: ToolBarActions){
    console.log(action);
  }
}
