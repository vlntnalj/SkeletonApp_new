import { Routes } from '@angular/router';

export const routes: Routes = [
  // Root
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Tabs + children
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
      },
      {
        path: 'departamentos',
        loadComponent: () =>
          import('./pages/departamentos/departamentos.page').then(m => m.DepartamentosPage),
      },
      {
        path: 'mantencion',
        loadComponent: () =>
          import('./pages/mantencion/mantencion.page').then(m => m.MantencionPage),
      },
      {
        path: 'pagos',
        loadComponent: () => import('./pages/pagos/pagos.page').then(m => m.PagosPage),
      },
      {
        path: 'personal',
        loadComponent: () => import('./pages/personal/personal.page').then(m => m.PersonalPage),
      },

      // default tab
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },

  // Public pages
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];
