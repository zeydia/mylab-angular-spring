import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { UserRegister } from './pages/user-register/user-register';
import { UserLogin } from './pages/user-login/user-login';
import { UserLayout } from './pages/user-layout/user-layout';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'login',
    component: UserLogin,
  },
  {
    path: 'register',
    component: UserRegister,
  },

  {
    path: '',
    component: UserLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'produit-list',
        loadComponent: () => import('./pages/produit-list/produit-list').then(m => m.ProduitList),
      },
      {
        path: 'produit-detail/:id',
        loadComponent: () => import('./pages/produit-detail/produit-detail').then(m => m.ProduitDetail),
      },
      {
        path: 'produit-add',
        loadComponent: () => import('./pages/produit-add/produit-add').then(m => m.ProduitAdd),

      },
      {
        path: 'produit-edit/:id',
        loadComponent: () => import('./pages/produit-edit/produit-edit').then(m => m.ProduitEdit),
      },
      {
        path: 'user-informations',
        loadComponent: () => import('./pages/user-informations/user-informations').then(m => m.UserInformations),
      },
    ],
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
