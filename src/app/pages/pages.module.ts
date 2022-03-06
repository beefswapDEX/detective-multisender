import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageModuleRoutes } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

// Components
import { AppBarComponent } from '../components/app-bar/app-bar.component';
import { MultisenderHeroComponent } from '../components/multisender-hero/multisender-hero.component';
import { FooterComponent } from '../components/footer/footer.component';
import { TokenMultisenderComponent } from '../views/token-multisender/token-multisender.component';
import { NftMultisenderComponent } from '../views/nft-multisender/nft-multisender.component';
import { SharedModule } from '../shared/shared.module';
import { Web3Service } from '../shared/services/web3-service/web3.service';
import { TokenService } from '../shared/services/token-service/token.service';

@NgModule({
  declarations: [
    AppBarComponent,
    MultisenderHeroComponent,
    FooterComponent,
    MainComponent,
    TokenMultisenderComponent,
    NftMultisenderComponent
  ],
  imports: [
    RouterModule.forChild(MainpageModuleRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CodemirrorModule
  ],
  providers: [
    Web3Service,
    TokenService
  ]
})
export class PagesModule { }
