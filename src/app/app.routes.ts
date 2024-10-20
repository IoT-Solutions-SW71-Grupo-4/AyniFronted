import { Routes } from '@angular/router';
import { authenticationGuard } from './iam/services/authentication.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/pages/dashboard/dashboard.component'),
                canActivate: [authenticationGuard]
            }, 
            {
                path: 'devices',
                loadComponent: () => import('./devices/pages/devices/devices.component'),
                canActivate: [authenticationGuard]

          
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'sign-in',
        loadComponent: () => import('./iam/pages/sign-in/sign-in.component')
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./iam/pages/sign-up/sign-up.component')
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
