import { Routes } from '@angular/router';
import { NftMultisenderComponent } from '../views/nft-multisender/nft-multisender.component';
import { TokenMultisenderComponent } from '../views/token-multisender/token-multisender.component';
import { MainComponent } from './main/main.component';

export const MainpageModuleRoutes: Routes = [
  { path: '',   redirectTo: '/token', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'token',
        component: TokenMultisenderComponent
      },
      {
        path: 'nft',
        component: NftMultisenderComponent
      }
    ]
  }
]
