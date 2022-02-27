import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  showNavOption: boolean = false;

  navItem = [
    {
      name: 'Token MultiSender',
      icon: 'assets/images/svg/dice.svg',
      path: 'token'
    },
    {
      name: 'NFT MultiSender',
      icon: 'assets/images/svg/box.svg',
      path: 'nft'
    }
  ]

  constructor() { 
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.showAppBar)
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.showAppBar)
  }

  showAppBar(): void {
    if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      document.querySelector('app-bar')?.classList.add('bg-multisender-blue-dark', 'shadow-md')
    } else {
      document.querySelector('app-bar')?.classList.remove('bg-multisender-blue-dark', 'shadow-md')
    }
  }

  toggleNavOption(): void {
    this.showNavOption = !this.showNavOption
  }
}
