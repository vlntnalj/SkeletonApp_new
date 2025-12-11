import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
        {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then(m => m.HomePage),
      },
      {
        path: 'tab1',
        loadComponent: () =>
          import('./tabs/tab1.page').then(m => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./tabs/tab2.page').then(m => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('./tabs/tab3.page').then(m => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/tab1',
  },
];
