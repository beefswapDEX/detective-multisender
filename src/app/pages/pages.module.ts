import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageModuleRoutes } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppBarComponent } from '../components/app-bar/app-bar.component';
import { MultisenderHeroComponent } from '../components/multisender-hero/multisender-hero.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { TokenMultisenderComponent } from '../views/token-multisender/token-multisender.component';
import { NftMultisenderComponent } from '../views/nft-multisender/nft-multisender.component';

@NgModule({
  declarations: [
    AppBarComponent,
    MultisenderHeroComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    TokenMultisenderComponent,
    NftMultisenderComponent
  ],
  imports: [
    RouterModule.forChild(MainpageModuleRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
