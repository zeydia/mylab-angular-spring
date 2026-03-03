import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProduitList } from './pages/produit-list/produit-list';
import { ProduitDetail } from './pages/produit-detail/produit-detail';
import { UserRegister } from './pages/user-register/user-register';
import { UserLogin } from './pages/user-login/user-login';
import { UserInformations } from './pages/user-informations/user-informations';
import { UserLayout } from './pages/user-layout/user-layout';
import { ProduitAdd } from './pages/produit-add/produit-add';
import { ProduitEdit } from './pages/produit-edit/produit-edit';

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
    children: [
      {
        path: 'produit-list',
        component: ProduitList,
      },
      {
        path: 'produit-detail/:id',
        component: ProduitDetail,
      },
      {
        path: 'produit-add',
        component: ProduitAdd,
      },
      {
        path: 'produit-edit/:id',
        component: ProduitEdit,
      },
      {
        path: 'user-informations',
        component: UserInformations,
      },
    ],
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
