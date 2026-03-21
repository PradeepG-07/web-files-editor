import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'editor',
        loadComponent: () => 
            import('./pages/editor/editor.component').then((m) => m.EditorComponent)
    },
    {
        path: 'file-manager',
        loadComponent: () => 
            import('./pages/file-manager/file-manager.component').then((m) => m.FileManagerComponent)
    }
];
